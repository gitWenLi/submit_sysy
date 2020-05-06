// 历史审批记录
<template>
  <div class="history_admin">
            <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的科研成果审批</el-breadcrumb-item>
      <el-breadcrumb-item>历史审批记录</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table
     :data="tableData"
      width="100%">
      <el-table-column
      ></el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getTabelData()
  },
  methods: {
    async getTabelData () {
      const { data } = await this.$axios.get('audit/audited', {
        params: {
          pn: 1,
          size: 10,
          auditResult: ''
        }
      })
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .history_admin {

  }
</style>
