// 科研成果预览
<template>
  <div class="list_look">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>科研成果</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果预览</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="idCode"
        label="登记编码">
      </el-table-column>
      <el-table-column
        prop="study"
        label="院系">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核状态">
      </el-table-column>
      <el-table-column
        prop="admin"
        label="审核人">
      </el-table-column>
      <el-table-column
        prop="export"
        label="导出附件">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        name: '12312312',
        idCode: 'asd123',
        study: '信息工程学院',
        author: '张三',
        status: '审核中',
        admin: '无',
        export: '返回地址'
      }, {
        name: '12312312',
        idCode: 'asd123',
        study: '信息工程学院',
        author: '张三',
        status: '审核完成',
        admin: 'admin',
        export: '返回地址'
      }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      // document.querySelector('.el-table th>.cell').style.display = 'table'
    })
  }
}
</script>

<style lang="less" scoped>
  .list_look {

  }
</style>
