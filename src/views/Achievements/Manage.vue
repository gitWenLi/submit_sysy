// 科研成果管理
<template>
  <div class="manage">
      <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- tab导航 -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">类别管理</span>
        <el-button type="primary" @click="showAddModel">添加分类</el-button>
        <el-table
        :data="categoryList">
          <el-table-column
          prop="categoryName"
          label="类别名称">
          </el-table-column>
          <el-table-column
          prop="desc"
          label="类别描述 ">
          </el-table-column>
          <el-table-column
          label="修改">
            <template v-slot="{row}">
             <el-button type="success" @click="editCategory(row,$event)" round size="mini" plain><i class="el-icon-edit"></i></el-button>
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
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">其他管理</span>
        其他管理
      </el-tab-pane>
    </el-tabs>

    <!-- 添加分类模态框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="40%">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
        <el-form-item label="类别名称" prop="categoryName">
          <el-input v-model="addForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="类别描述">
          <el-input v-model="addForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSuccess">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类模态框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editDialogVisible"
      width="40%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="类别名称" prop="categoryName">
          <el-input v-model="editForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="类别描述">
          <el-input v-model="editForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSuccess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      pn: 1,
      size: 10,
      categoryList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        categoryName: '',
        desc: ''
      },
      editForm: {
        categoryName: '',
        desc: '',
        id: ''
      },
      rules: {
        categoryName: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCategoryData()
  },
  methods: {
    // 分页
    handleCurrentSize (index) {
      this.pn = index
      this.getCategoryData()
    },
    // 获取表格数据
    async getCategoryData () {
      const { data } = await this.$axios.get('/category')
      // console.log(data)
      this.categoryList = data.data
      this.total = data.data.length
    },
    // 模态框显示
    showAddModel () {
      this.addDialogVisible = true
    },
    // 添加类别提交
    addSuccess () {
      this.$refs.addForm.validate(async valied => {
        // console.log(valied)
        if (!valied) return false
        if (!this.addForm.desc) {
          this.addForm.desc = '暂无描述'
        }
        const { data } = await this.$axios.post('category', this.addForm)
        // console.log(data)
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.addDialogVisible = false
          this.getCategoryData()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 修改类别
    editCategory (row, e) {
      // console.log(id)
      this.editDialogVisible = true
      this.editForm.id = row._id
      this.editForm.categoryName = row.categoryName
      this.editForm.desc = row.desc
    },
    // 修改成功
    async editSuccess () {
      this.$refs.editForm.validate(async valied => {
        if (!valied) return false
        // console.log(this.editForm)
        const { data } = await this.$axios.put('category', this.editForm)
        // console.log(data)
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.editDialogVisible = false
          this.getCategoryData()
        } else {
          this.$message.error(data.msg)
          this.editDialogVisible = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .manage {
   /deep/ .el-tabs__nav-wrap{
      line-height: 0;
    }
    .el-pager li {
      background-color: #f4f4f5;
      color: #606266;
      margin: 0 3px;
    }
    .el-pagination {
      margin-top: 20px;
    }
    /deep/ .el-button--primary {
      float: left;
    }
    /deep/ .el-dialog__header {
      line-height: 0;
    }
    .dialog-footer {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
