// 更改个人信息
<template>
  <div class="change_info">
  <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 修改个人信息form 表单 -->
  <el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
  <p>修改个人信息</p>
    <el-form-item label="用户名" class="flag">
      <el-input v-model="userInfoList.username" readonly :value="userInfoList.username"></el-input>
    </el-form-item>
    <el-form-item label="学号" class="flag">
      <el-input v-model="userInfoList.userNum" readonly :value="userInfoList.userNum"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="form.sex" placeholder="请选择性别" :value="userInfoList.sex"  >
        <el-option label="男" :value="1"></el-option>
        <el-option label="女" :value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="院系">
      <el-select v-model="form.faculty" placeholder="请选择院系" :value="userInfoList.faculty" @change="getMajor($event)">
        <el-option
        v-for="item in facultyList"
        :key="item._id"
        :label="item.facultyName"
        :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="专业" >
      <el-select v-model="form.major" placeholder="请选择专业" :value="userInfoList.major">
        <el-option
          v-for="item in majorList"
          :key="item._id"
          :label="item.majorName"
          :value="item._id"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="头像" prop="avatar" class="userimg">
      <el-upload
         class="avatar-uploader"
         action="https://jsonplaceholder.typicode.com/posts/"
         :show-file-list="false"
         :on-success="handleAvatarSuccess"
         :on-preview="handlePictureCardPreview">
         <img v-if="userInfoList.avatar" :src="userInfoList.avatar" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="个人描述">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
        <el-form-item label="职位"  prop="jobName">
      <el-select v-model="form.jobName" placeholder="请选择职位">
        <el-option label="学生" value="student"></el-option>
        <el-option label="教师" value="teacher"></el-option>
      </el-select>
    </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="success">提交</el-button>
      <el-button @click="goback">取消</el-button>
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
        // userNum: '',
        // password: '',
        // checkPass: '',
        sex: '',
        faculty: [], // 院系编号
        major: [], // 专业编号
        desc: '', // 个人描述
        avatar: '', // 头像
        jobName: '' // 职位
      },
      majorList: [],
      facultyList: [],
      // facultyList: {},
      userInfoList: {},
      imageUrl: '',
      rules: {
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
    this.getFaculty()
    // this.getMajor()
  },
  methods: {
    async getUserList () {
      const { data } = await this.$axios.get('user/myself')
      this.userInfoList = data.data
      // this.form = { ...this.userInfoList }
      const { username, avatar, sex, major, faculty, desc, jobName } = this.userInfoList
      // // console.log(...this.userInfoList)
      this.form.username = username
      this.form.avatar = avatar
      this.form.sex = sex
      this.form.major = major.majorName
      this.form.faculty = faculty.facultyName
      this.form.desc = desc
      this.form.jobName = jobName
    },
    // 获取院系
    async getFaculty () {
      const { data } = await this.$axios.get('faculty')
      // console.log(data)
      this.facultyList = data.data
      // console.log(this.facultyList)
    },
    // 获取专业
    // async getMajor (id) {
    //   // console.log('hhh', id)
    //   const { data } = await this.$axios.get(`major/faculty?id=${id}`)
    //   // console.log(data)
    //   this.majorList = data.data
    // },

    handleAvatarSuccess (res, file) {
      this.userInfoList.avatar = URL.createObjectURL(file.raw)
      this.form.avatar = URL.createObjectURL(file.raw)
    },
    handlePictureCardPreview (file) {
      console.log('file', file)
      this.userInfoList.avatar = file.url
      this.form.avatar = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    success () {
      this.$refs.form.validate(async valied => {
        if (!valied) return false
        const { data } = await this.$axios.put('user/myself', this.form)
        // console.log(data)
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.$router.push('/PersonalInfo')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    goback () {
      this.$router.push('/PersonalInfo')
    }
  }
}
</script>

<style lang="less" scoped>
  .change_info{
    // height: 100%;
    // background-color:#2d85cd;
    overflow: hidden;
    .el-form  {
      .flag {
      /deep/ input::-webkit-input-placeholder {
        color: #333;
      }
      /deep/ input::-moz-input-placeholder {
        color: #333;
      }
      /deep/ input::-ms-input-placeholder {
        color: #333;
      }
      }

      text-align: left;
      background-color: #fff;
      // width: 600px;
      margin: 0 auto;
      padding: 0px 400px 15px 40px;
      border-radius: 10px;
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
      }
      .avatar-uploader .el-upload {
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
          border: 1px dashed #ccc;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
    }
  }
</style>
