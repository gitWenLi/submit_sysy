<template>
  <div class="login">
<el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
<img src="../assets/head.png" alt="">
  <el-form-item label="用户名：" prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码：" prop="password">
      <el-input v-model="form.password" ></el-input>
  </el-form-item>
<el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button>取消</el-button>
</el-form-item>
</el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6到12字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      alert('登录成功')
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    height: 100%;
    background-color:#528FFF;
    overflow: hidden;
    .el-form  {
      background-color: #fff;
      width: 400px;
      margin: 100px auto;
      padding: 75px 45px 15px;
      border-radius: 20px;
      position: relative;
      .el-button:last-child {
        float: right;
        margin-right: 50px;
      }
      img {
        display: block;
        width: 120px;
        position: absolute;
        top: -95px;
        left: 50%;
        transform: translateX(-50%);
        border: 10px solid #fff;
        border-radius: 20px;
      }
    }
  }
</style>
