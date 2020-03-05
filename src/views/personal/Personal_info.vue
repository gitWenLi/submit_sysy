// 个人信息
<template>
  <div class="personal_info">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 个人 信息-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">个人信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" class="flag" @click="goChange">修改信息</el-button>
        <el-button style="float: right; padding: 3px 5px" type="text" class="flag" @click="changePassword">修改密码</el-button>
      </div>
      <div class="info">
        <p class="item">用户ID：{{userInfoList.userNum}}</p>
        <p class="item">用户姓名：{{ userInfoList.username}}</p>
        <p class="item avatar">我的头像: <img :src="userInfoList.avatar" alt="点击修改信息更换头像"></p>
      </div>
      <div class="info">
        <p class="item">性别：{{userInfoList.sex ? userInfoList.sex === 0 ? '女' : '男' : '未选择'}}</p>
        <p class="item">所在学院：{{userInfoList.faculty ? userInfoList.faculty : '未选择'}}</p>
        <p class="item">所在专业：{{userInfoList.major ? userInfoList.major : '未选择'}}</p>
        <el-tag  v-if="!userInfoList.sex || !userInfoList.faculty || !userInfoList.major" type="warning">注意：请完善信息！点击修改信息进行完善</el-tag>
      </div>
</el-card>

<el-dialog title="修改密码" :visible.sync="handlePassword" width="40%">
  <template>
    <el-form :model="passwordForm" status-icon :rules="rules" label-width="100px" ref="passwordForm">
      <el-form-item size="80%" label="原始密码" prop="password">
        <el-input type="password" v-model="passwordForm.password" placeholder="请输入旧的密码"></el-input>
      </el-form-item>
      <el-form-item label="新的密码" prop="newPassword">
        <el-input type="password" v-model="passwordForm.newPassword" placeholder="请输入新的密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="passwordForm.checkPass" auto-complete="off" placeholder="请重新输入新的密码"></el-input>
      </el-form-item>
    </el-form>
  </template>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="back">取消</el-button>
    </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    let validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新的密码'))
      } else {
        if (this.passwordForm.checkPass !== '') {
          this.$refs.passwordForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userInfoList: {},
      handlePassword: false,
      passwordForm: {
        password: '',
        newPassword: '',
        checkPass: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6到12字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6到12字符', trigger: 'change' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data } = await this.$axios.get('user/myself')
      if (data.code === 0) {
        // this.$message.success(data.msg)
        this.userInfoList = data.data
      } else {
        this.$message.error(data.msg)
      }
      // console.log(this.userInfoList)
    },
    goChange () {
      this.$router.push('/changeinfo')
    },
    changePassword () {
      this.handlePassword = true
    },
    submit () {
      this.$refs.passwordForm.validate(async valied => {
        if (!valied) return false
        const { data } = await this.$axios.put('user/password', this.passwordForm)
        // console.log(data)
        if (data.code === 0) {
          this.$refs.passwordForm.resetFields()
          this.$message.success(data.msg)
          this.$router.push('/login')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    back () {
      this.$refs.passwordForm.resetFields()
      this.handlePassword = false
    }
  }
}
</script>

<style lang="less" scoped>
  .personal_info {
    /deep/ .el-form{
      margin: 0 40px;
    }
    /deep/ .el-dialog__header {
      padding: 0;
      font-size: 24px;
      line-height: 85px;
    }
    /deep/ .el-dialog__title {
      font-size: 20px;
    }
    /deep/ .el-input__inner  {
      height: 55px;
    }
    /deep/ .el-form-item__label  {
      height: 55px;
    }
    .flag {
      font-size: 16px;
    }
    .title {
      font-size: 24px;
    }
    .item {
      margin-bottom: 20px;
      font-size: 18px;
    }
    .info:nth-child(2) {
      margin-left: 300px;
    }
    .info {
      text-align: left;
      line-height: 50px;
      padding: 0 50px 40px;
      float: left;
      .avatar {
        margin-bottom: 150px;
        position: relative;
        img {
          height: 150px;
          width: 150px;
          position: absolute;
          left: 140px;
          top: 35px;
          border:1px dashed #ccc;
        }
      }
    }
  }
</style>
