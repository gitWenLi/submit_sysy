// 科研成果查询
<template>
  <div class="list_query">
  <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果</el-breadcrumb-item>
    </el-breadcrumb>
  <!-- 查询 -->
  <el-form
    label-width="80px"
    label-position="left">
    <el-form-item label="院系" >
      <el-select v-model="formData.facultyName" >
        <el-option value="">全部</el-option>
        <el-option
        v-for="item in facultyList"
        :key="item._id"
        :label="item.facultyName"
        :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类别"  >
      <el-select v-model="formData.category" >
        <el-option value="">全部</el-option>
        <el-option
        v-for="item in majorList"
        :key="item._id"
        :label="item.categoryName"
        :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标题"  >
      <el-input v-model="formData.title" ></el-input>
    </el-form-item>
    <el-form-item class="btn">
      <el-button type="primary" round @click="queryList">查询</el-button>
    </el-form-item>
  </el-form>

  <!-- 表格 -->
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="category.categoryName"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="facultyName.facultyName"
        label="院系">
      </el-table-column>
      <el-table-column
        prop="author.username"
        label="作者">
      </el-table-column>
      <!-- <el-table-column
        prop="status"
        label="审核状态">
      </el-table-column> -->
      <el-table-column
        prop="lastAudit.username"
        label="审核人">
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
      facultyList: [],
      majorList: [],
      tableData: [],
      formData: {
        facultyName: '',
        category: '',
        title: ''
      }
    }
  },
  created () {
    this.getTableData()
    this.getFaculty()
    this.getCategory()
  },
  methods: {
    // 分页
    handleCurrentSize (index) {
      this.pn = index
      this.getTableData()
    },
    // 跳转详情 页面
    goDetail (row) {
      this.$router.push({ path: '/listlook', query: { id: row._id } })
    },
    // 获取表格信息
    async getTableData () {
      const { data } = await this.$axios.get('achievement', {
        params: {
          pn: this.pn,
          size: 10,
          ...this.formData
        }
      })
      if (data.code === 0) {
        this.tableData = data.data
        this.total = data.data.length
      } else {
        this.$message.error(data.msg)
      }
    },
    // 获取院系
    async getFaculty () {
      const { data } = await this.$axios.get('faculty')
      // console.log(data)
      this.facultyList = data.data
      // console.log(this.facultyList)
    },
    // 获取类别
    async getCategory () {
      const { data } = await this.$axios.get('category')
      // console.log(data)
      this.majorList = data.data
    },
    // 查询
    queryList () {
      this.getTableData()
    }
  }
}
</script>

<style lang="less" scoped>
.list_query {
  .el-select {
    display: block;
  }
  /deep/ .el-form--label-left .el-form-item__label {
    text-align: center;
  }
  .el-form {
    display: flex;
  }
  // .el-form-item {
  //   width: 30%;
  //   float: left;
  //   margin-left: 15px;
  // }
  .btn {
    width: 20%;
    // float: left;
    .el-button.is-round {
      padding: 12px 50px;
    }
  }
}
</style>
