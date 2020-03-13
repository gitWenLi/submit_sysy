// 管理普通用户
<template>
  <div class="manage_user">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>普通用户账号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户列表表格 -->
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="userNum"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <template>

      <el-table-column label="院系" prop="getFacultyMajor('faculty',faculty)">
        <!-- <template v-slot="{row}"> -->
          <!-- <span></span> -->
          <!-- <span>{{ row.facultyct }}</span> -->
        <!-- </template> -->
      </el-table-column>
      </template>
      <el-table-column
        label="详细信息">
          <template v-slot="{row}">
            <el-button type="success" icon="el-icon-view" round plain size="mini" @click="userInfo(row._id)">查看信息</el-button>
          </template>
      </el-table-column>
      <el-table-column
        prop="something"
        label="操作">
        <template v-slot="{row}">
          <el-button type="primary" icon="el-icon-star-off" round plain size="mini" @click="rePassword(row._id,$event)">重置密码</el-button>
          <el-button type="warning" icon="el-icon-remove-outline" round plain size="mini" @click="delUser(row._id,$event)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100">
    </el-pagination>

    <!-- 查看用户信息模态框 -->
    <el-dialog title="用户信息" :visible.sync="handleUserInfo" width="40%">
      <template>
        <el-form :model="userInfoData" status-icon label-width="200px" ref="userInfoData">
          <el-form-item label="用户ID：">
            {{userInfoData.userNum}}
          </el-form-item>
          <el-form-item label="用户姓名：">
            {{userInfoData.username}}
          </el-form-item>
          <el-form-item label="性别：">
            {{userInfoData.sex == 0 ? '女' : '男'}}
          </el-form-item>
          <!-- <el-form-item label="所在学院：">
            {{userInfoData.faculty == '' ? '未填' : getFacultyMajor('faculty', userInfoData.faculty)}}
          </el-form-item>
          <el-form-item label="所在专业：">
            {{userInfoData.major == '' ? '未填' : getFacultyMajor('major', userInfoData.major)}}
          </el-form-item> -->
          <el-form-item label="职位：">
            {{userInfoData.jobName == '' ? '未填' : userInfoData.jobName}}
          </el-form-item>
          <el-form-item label="描述：">
            {{userInfoData.desc == '' ? '暂无描述' : userInfoData.desc}}
          </el-form-item>
        </el-form>
       </template>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" class="goback" @click="handleUserInfo = false">返回</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 2, // 每页显示条数
      total: 10,
      handleUserInfo: false,
      userInfoData: {}
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getFacultyMajor (type, val) {
      console.log(val)
      let arr = []
      if (type === 'faculty') {
        arr = JSON.parse(localStorage.getItem('facultyArr'))
      } else {
        arr = JSON.parse(localStorage.getItem('majorArr'))
      }
      for (let item of arr) {
        if (val.val === item.lable) {
          console.log('item', item.value)
          return item.value
        }
      }
      // return ''
    },
    async getUserList () {
      const { data } = await this.$axios.get('user/userList')
      // console.log(data)
      if (data.code === 0) {
        this.tableData = data.data
        this.total = data.data.length
      } else {
        this.$message.error(data.msg)
      }
    },
    async delUser (id, e) {
      try {
      // console.log('id', id)
        await this.$confirm('确定删除该用户吗？', '温馨提示', { type: 'warning' })
        const { data } = await this.$axios.delete(`user?id=${id}`)
        // console.log(data)
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.getUserList()
        } else {
          this.$message.error(data.msg)
        }
      } catch {
        this.$message.info('已取消操作')
      } finally {
        e.target.blur()
        e.target.parentNode.blur()
      }
    },
    async rePassword (id, e) {
      try {
        await this.$confirm('确定重置该用户密码吗？', '温馨提示', { type: 'warning' })
        const { data } = await this.$axios.put(`user/initPassword?id=${id}`)
        // console.log(data)
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.getUserList()
        } else {
          this.$message.error(data.msg)
        }
      } catch {
        this.$message.info('已取消操作')
      } finally {
        e.target.blur()
        e.target.parentNode.blur()
      }
    },
    async userInfo (id) {
      this.handleUserInfo = true
      const { data } = await this.$axios.get(`user/userDetail?id=${id}`)
      // console.log(data)
      if (data.code === 0) {
        this.userInfoData = data.data
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.manage_user {
      /deep/ .el-dialog__header {
      padding: 0;
      font-size: 24px;
      line-height: 85px;
    }
    /deep/ .el-dialog__title {
      font-size: 20px;
    }
    /deep/ .el-dialog__footer {
      text-align: center
    }
    .el-pagination {
      margin-top: 20px;
    }
    .goback {
      padding:12px 120px;
      margin: 0 auto;
    }
}

</style>
