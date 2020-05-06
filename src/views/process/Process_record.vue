// 科研成果审批
<template>
  <div class="process_record">
          <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>科研成果审批</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果审批记录</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table
    :data="tableData"
    width="100%">
      <el-table-column
      prop="newData.title"
      label="标题">
      <template v-slot="{ row }">
        <span @click="goDetail(row)" >{{row.newData.title}}</span>
      </template>
      </el-table-column>
      <el-table-column
      prop="author.username"
      label="作者">
      </el-table-column>
      <el-table-column
      prop="createTime"
      label="提交时间">
      </el-table-column>
      <el-table-column
      label="当前状态">
      <template v-slot="{ row }">
        <span v-if="row.auditResult === 'yes'" >通过</span>
        <span v-if="row.auditResult === 'no'" >拒绝</span>
        <span v-if="row.auditResult === 'wait'" >等待</span>
        <span v-if="row.auditResult === 'del'" >删除</span>
      </template>
      </el-table-column>
      <el-table-column
      label="操作">
      <template v-slot="{ row }">
        <el-button type="primary" round plain size="small" @click="goDetail(row)" ><i class="el-icon-view"></i>查看</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentSize"
      :total="total"
      :current-page="pn"
      :page-size="size">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      pn: 1,
      size: 10,
      tableData: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 分页
    handleCurrentSize (index) {
      this.pn = index
      this.getTableData()
    },
    // 详情
    goDetail (row) {
      this.$router.push({ path: '/processdetail', query: { id: row._id, state: row.auditResult, isLook: 1 } })
      // console.log(row._id)
    },
    // 获取表格数据
    async getTableData () {
      const { data } = await this.$axios.get('audit/admin', {
        params: {
          pn: this.pn,
          size: 10,
          auditResult: ''
        }
      })
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

</style>
