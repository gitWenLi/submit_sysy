<template>
  <div class="process_detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>科研成果审批</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果审批</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果审批详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 审批form -->
    <el-form v-if="isLook !== 1" :model="formData" ref="formData" :rules="rules" status-icon label-width="80px">
      <el-form-item label="审批结果" prop="auditResult">
        <el-select v-model="formData.auditResult" >
          <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批备注" class="flag">
        <el-input v-model="formData.auditText" placeholder="请输入审批备注" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" >提交</el-button>
        <el-button @click="goback" >返回</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="isLook === 1" :model="formDataLook" ref="formData" status-icon label-width="80px">
      <el-form-item label="审批结果">
        <el-input v-model="formDataLook.auditResult" :value="formDataLook.auditResult" readonly ></el-input>
      </el-form-item>
      <el-form-item label="审批备注" class="flag">
        <el-input v-model="formDataLook.auditText" :value="formDataLook.auditText" readonly ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="goback" >返回</el-button>
      </el-form-item>
    </el-form>
    <!-- 内容详情 -->
    <el-card class="box-card">
      <h1>{{title}}</h1>
      <div class="other">
        <span>时间:{{time}}</span>
        <span>作者:{{author}}</span>
      </div>
      <div v-html="content">
        {{content}}
      </div>
      <div class="file" v-if="fileList.length !== 0" >
        附件:
        <p v-for="item in fileList" :key="item" @click="review(item)">点击预览</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        auditResult: '',
        auditText: ''
      },
      formDataLook: {
        auditResult: '',
        auditText: ''
      },
      options: [
        // { value: 'wait', name: '等待' },
        { value: 'yes', name: '通过' },
        { value: 'no', name: '拒绝' }
        // { value: 'del', name: '删除' }
      ],
      rules: {
        auditResult: [
          { required: true, message: '请选择审批结果', trigger: 'change' }
        ]
      },
      title: '',
      content: '',
      author: '',
      time: '',
      fileList: [],
      isLook: 0
    }
  },
  created () {
    this.isLook = this.$route.query.isLook
    this.getData()
  },
  methods: {
    // 返回
    goback () {
      if (this.isLook !== 1) {
        this.$router.push('/processagreen')
      } else {
        this.$router.push('/processrecord')
      }
    },
    // 提交
    submit () {
      this.$refs.formData.validate(async valied => {
        if (!valied) return false
        let param = {
          ...this.formData,
          id: this.$route.query.id
        }
        const { data } = await this.$axios.post('audit', param)
        // console.log(data)
        if (data.code === 0) {
          this.$message.success('操作成功')
          this.$router.push('/processagreen')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 点击预览
    review (item) {
      window.open(item)
    },
    // 获取页面数据
    async getData () {
      // this.formData.auditResult = this.$route.query.state
      let id = this.$route.query.id
      const { data } = await this.$axios.get('audit/detail', {
        params: {
          id: id
        }
      })
      // console.log(data)
      if (data.code === 0) {
        this.title = data.data.newData.title
        this.content = data.data.newData.content
        this.time = data.data.createTime
        this.author = data.data.author.username
        this.fileList = data.data.newData.accessoryArr
        let result = data.data.auditResult
        if (result === 'yes') {
          this.formDataLook.auditResult = '通过'
        } else if (result === 'no') {
          this.formDataLook.auditResult = '拒绝'
        } else if (result === 'wait') {
          this.formDataLook.auditResult = '等待'
        } else if (result === 'del') {
          this.formDataLook.auditResult = '删除'
        }
        if (!data.data.auditText) {
          this.formDataLook.auditText = '无'
        } else {
          this.formDataLook.auditText = data.data.auditText
        }
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .process_detail {
    .el-form {
      display: flex;
      background-color: #fff;
      padding-top: 20px;
      .flag {
        width: 40%;
      }
      .el-button {
        padding: 12px 30px;
      }
    }
    .box-card {
      margin-top: 10px;
      padding: 10px 30px;
      .other {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
      }
      .file {
        margin-top: 20px;
        text-align: left;
        color:steelblue;
        font-style: 16px;
        p {
          cursor: pointer;
        }
      }
    }
  }
</style>
