// 科研成果预览
<template>
  <div class="list_look">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>科研成果</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果详情预览</el-breadcrumb-item>
      <el-button size="small" type="primary" @click="goback">返回</el-button>
    </el-breadcrumb>

    <!-- 内容详情 -->
    <el-card class="box-card">
      <h1>{{title}}</h1>
      <div class="other">
        <span>类别:{{category}}</span>
        <span>时间:{{time}}</span>
        <span>作者:{{author}}</span>
        <span>审批人:{{lastAudit}}</span>
        <span>浏览数:{{readNumber}}</span>
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
      title: '',
      time: '',
      author: '',
      content: '',
      category: '',
      lastAudit: '',
      readNumber: 0,
      fileList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      // document.querySelector('.el-table th>.cell').style.display = 'table'
    })
  },
  created () {
    this.getContent()
  },
  methods: {
    // 返回
    goback () {
      this.$router.push('/listquery')
    },
    // 获取内容数据
    async getContent () {
      const { data } = await this.$axios.get('achievement/detail', {
        params: {
          id: this.$route.query.id
        }
      })
      // console.log(data)
      if (data.code === 0) {
        const { title, category, createTime, facultyName, lastAudit, readNumber, accessoryArr, content, author } = data.data
        this.title = title
        this.category = category.categoryName
        this.time = createTime
        this.facultyName = facultyName.facultyName
        this.lastAudit = lastAudit.username
        this.readNumber = readNumber
        this.fileList = accessoryArr
        this.content = content
        this.author = author
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .list_look {
    .el-breadcrumb {
      .el-button {
        float: right;
        margin-right: 100px;
        margin-top: 4px;
        padding:9px 30px;
      }
    }
    .box-card {
      margin-top: 10px;
      padding: 10px 30px;
      h1 {
        margin-bottom: 20px;
        color: #333;
      }
      .other {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #ccc;
        margin-bottom: 20px;
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
