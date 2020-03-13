// 添加管理员
<template>
  <div class="add_admin">
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加管理员按钮 -->
    <div class="btn">
      <el-button type="primary" @click="handleAddAdmin = true">添加管理员</el-button>
    </div>

    <!-- 管理员概况表格-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="userNum"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="howLong"
        label="账号时长">
      </el-table-column>
      <el-table-column
        prop="jobName"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="recordNum"
        label="审批数">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100">
    </el-pagination>

    <!-- 添加管理员模态框 -->
    <el-dialog title="添加管理员" :visible.sync="handleAddAdmin" width="40%">
      <template>
        <el-form :model="addForm" status-icon :rules="rules" label-width="100px" ref="addForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户账号" prop="userNum">
            <el-input v-model="addForm.userNum" placeholder="请输入用户账号" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="addForm.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
          </el-form-item>
        </el-form>
       </template>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addAdmin">添加</el-button>
    <el-button @click="handleAddAdmin = false">取消</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addForm.checkPass !== '') {
          this.$refs.addForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      handleAddAdmin: false,
      pagenum: 1,
      pagesize: 2, // 每页显示条数
      total: 0,
      addForm: {
        username: '',
        userNum: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userNum: [
          { required: true, message: '请输入账号', trigger: 'blur' }
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
  created () {
    this.getAdminList()
  },
  methods: {
    async getAdminList () {
      const { data } = await this.$axios.get('user/userList', {
        params: {
          isAdministrator: true
        }
      })
      if (data.code === 0) {
        this.tableData = data.data
        this.total = data.data.length
        // console.log(this.tableData)
      } else {
        this.$message.error(data.msg)
      }
    },
    addAdmin () {
      this.$refs.addForm.validate(async valied => {
        if (!valied) return false
        const { data } = await this.$axios.post('user/addAdminUser', this.addForm)
        // console.log(data.code, data.msg)
        if (data.code === 0) {
          this.$message.success(data.msg)
          // this.$router.push('/login')
          this.$refs.addForm.resetFields()
          this.pagenum = Math.ceil((this.total + 1) / this.pagesize)
          this.getAdminList()
          this.handleAddAdmin = false
        } else {
          this.$refs.addForm.resetFields()
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .add_admin {
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
      height: 50px;
    }
    /deep/ .el-form-item__label  {
      height: 50px;
    }
    /deep/ .el-dialog__footer {
      text-align: center;
      line-height: 0;
      padding-bottom: 40px;
      .el-button {
        padding:12px 60px;
        margin-left: 30px;
      }
    }
    .el-pager li {
      background-color: #f4f4f5;
      color: #606266;
      margin: 0 3px;
    }
    .el-pagination {
      margin-top: 20px;
    }
    .btn {
      line-height: 50px;
      margin-bottom: 15px;
      text-align: left;
    }
  }
</style>
