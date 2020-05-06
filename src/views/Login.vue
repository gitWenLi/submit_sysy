<template>
  <div class="login">
<el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
<img src="../assets/logo.jpg" alt="">
  <p>黄淮学院科研成果登记系统</p>
  <el-form-item label="账号：" prop="userNum">
    <el-input v-model="form.userNum"></el-input>
  </el-form-item>
  <el-form-item label="密码：" prop="password">
      <el-input type="password" v-model="form.password" ></el-input>
  </el-form-item>
<el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="newuser">注册</el-button>
</el-form-item>

</el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        userNum: '',
        password: ''
      },
      rules: {
        userNum: [
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
      this.$refs.form.validate(async valied => {
        if (!valied) return false
        const { data } = await this.$axios.post('user/login', this.form)
        if (data.code === 0) {
          this.$message.success(data.msg)
          localStorage.setItem('isAdministrator', data.data.isAdministrator)
          this.$router.push('/listquery')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    newuser () {
      this.$router.push('/newuser')
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  }
}
</script>

<style lang="less" scoped>
  .login{
    height: 100%;
    // background-color:#2d85cd;
    background: url("../assets/bgc.jpg") no-repeat;
    background-size: 100% 100%;
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
      p {
        text-align: center;
        margin-bottom: 20px;
        font-family: '微软雅黑';
      }
      img {
        display: block;
        width: 240px;
        position: absolute;
        top: -55px;
        left: 50%;
        transform: translateX(-50%);
        border: 10px solid #fff;
        border-radius: 20px;
      }
    }
  }
</style>
