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
      <el-table-column
        prop="faculty"
        label="院系">
      </el-table-column>
      <el-table-column
        prop="reservePwd"
        label="密码重置">
      </el-table-column>
      <el-table-column
        prop="something"
        label="操作">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 2, // 每页显示条数
      total: 10
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data } = await this.$axios.get('user/userList')
      // console.log(data)
      if (data.code === 0) {
        this.tableData = data.data
        this.total = data.data.length
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.manage_user {
    .el-pagination {
      margin-top: 20px;
    }
}

</style>
