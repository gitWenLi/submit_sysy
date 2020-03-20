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
      <el-select>
        <el-option>全部</el-option>
        <el-option
        v-for="item in facultyList"
        :key="item._id"
        :label="item.facultyName"
        :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类别" >
      <el-select>
        <el-option>全部</el-option>
        <el-option
        v-for="item in majorList"
        :key="item._id"
        :label="item.categoryName"
        :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="编号">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="关键字">
      <el-input></el-input>
    </el-form-item>
    <el-form-item class="btn">
      <el-button type="primary" round>搜索</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      facultyList: [],
      majorList: []
    }
  },
  created () {
    this.getFaculty()
    this.getCategory()
  },
  methods: {
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
      console.log(data)
      this.majorList = data.data
    }
  }
}
</script>

<style lang="less" scoped>
.list_query {
  .el-form-item {
    width: 40%;
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
