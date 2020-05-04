// 科研成果查询
<template>
  <div class="list_query">
  <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果查询</el-breadcrumb-item>
    </el-breadcrumb>
  <!-- 查询 -->
  <el-form
    label-width="80px"
    label-position="left">
    <el-form-item label="院系" >
      <el-select v-model="formData.facultyName" >
        <el-option>全部</el-option>
        <el-option
        v-for="item in facultyList"
        :key="item._id"
        :label="item.facultyName"
        :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类别"  >
      <el-select v-model="formData.category" >
        <el-option>全部</el-option>
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
      <el-button type="primary" round @click="queryList()">查询</el-button>
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
      <!-- <el-table-column
        prop="study"
        label="院系">
      </el-table-column> -->
      <el-table-column
        prop="author.username"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核状态">
      </el-table-column>
      <el-table-column
        prop="lastAudit.username  "
        label="审核人">
      </el-table-column>
      <el-table-column
        prop="accessoryArr"
        label="附件">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    // 获取表格信息
    async getTableData () {
      let param = {
        pn: 1,
        size: 10,
        ...this.formData
      }
      const { data, code, msg } = await this.$axios.get('achievement', { param })
      if (code === 0) {
        this.tableData = data
      } else {
        this.$message.error(msg)
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
  .el-form-item {
    width: 30%;
    float: left;
    margin-left: 15px;
  }
  .btn {
    width: 20%;
    // float: left;
    .el-button.is-round {
      padding: 12px 50px;
    }
  }
}
</style>
