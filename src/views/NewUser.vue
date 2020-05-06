<template>
  <div class="new_user">
  <el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
  <p>用户注册</p>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="学号" prop="userNum">
      <el-input v-model="form.userNum"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.sex" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="院系">
      <el-select v-model="form.faculty" placeholder="请选择院系">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="专业">
      <el-select v-model="form.major" placeholder="请选择专业">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="个人描述">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="success">完成</el-button>
      <el-button>重置</el-button>
  </el-form-item>

  </el-form>
</div>
</template>

<script>
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        userNum: '',
        password: '',
        checkPass: '',
        sex: '',
        faculty: '', // 院系编号
        major: '', // 专业编号
        desc: '', // 个人描述
        avatar: '', // 头像
        jobName: '' // 职位
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userNum: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6到12字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    success () {
      this.$refs.form.validate(async valied => {
        if (!valied) return false
        const { data } = await this.$axios.post('user/addUser', this.form)
        // console.log(data.code, data.msg)
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.$router.push('/login')
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .new_user{
    // height: 100%;
    // background-color:#2d85cd;
    background: url("../assets/bgc.jpg") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .el-form  {
      background-color: #fff;
      width: 600px;
      margin: 50px auto;
      padding: 75px 45px 15px;
      border-radius: 20px;
      position: relative;
      .el-select {
        display: block
      }
      .el-button:last-child {
        float: right;
        margin-right: 50px;
      }
      p {
        font-size: 28px;
        background-color: #fff;
        text-align: center;
        // display: block;
        width: 220px;
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        // border: 10px solid #fff;
        border-radius: 5px;
      }
    }
  }
</style>
