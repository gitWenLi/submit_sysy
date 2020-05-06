// 科研成果上传登记
<template>
  <div class="submit">
        <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>科研成果</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果上传登记</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- form表单 -->
    <el-form ref="submitForm" :model="submitForm" :rules="rules" status-icon label-width="80px">
      <p>科研成果上传登记</p>
      <el-form-item label="标题" prop="title" >
        <el-input v-model="submitForm.title" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="院系" prop="facultyName">
        <el-select v-model="submitForm.facultyName" placeholder="请选择院系" >
          <el-option
          v-for="item in facultyList"
          :key="item._id"
          :label="item.facultyName"
          :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别" prop="category"  >
        <el-select v-model="submitForm.category" placeholder="请选择类别" >
          <el-option value="">全部</el-option>
          <el-option
          v-for="item in majorList"
          :key="item._id"
          :label="item.categoryName"
          :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
      <vueEditor useCustomImageHandler @image-added="handleImageAdded"
       :editorToolbar="customToolbar"
       v-model="submitForm.content"></vueEditor>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          class="upload-demo"
          action="http://zz.mawenli.com/upload/uploadFile"
          :with-credentials='true'
          :on-success="handleSuccess"
          :before-remove="beforeRemove"
          multiple
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form class="btns">
        <el-button type="primary" @click="submit" >提交</el-button>
        <el-button @click="resetForm" >重置</el-button>
      </el-form>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      submitForm: {
        title: '',
        facultyName: '',
        content: '',
        category: '',
        accessoryArr: []
      },
      facultyList: [],
      majorList: [],
      fileList: [],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        facultyName: [
          { required: true, message: '请选择院系', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      customToolbar: [
        ['bold', 'underline'], // toggled buttons
        // ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        // [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction
        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        // [{ 'font': [] }],
        [{ align: [] }],
        // ["clean"],
        ['link', 'image', 'video']
        // ["image"],
      ]
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
      // console.log(data)
      this.majorList = data.data
    },
    // 上传成功
    handleSuccess (data) {
      if (data.code === 0) {
        this.$message.success('上传成功!')
        this.submitForm.accessoryArr.push(data.filePath)
      } else {
        this.$message.error('上传失败')
      }
    },
    // 删除文件
    beforeRemove () {

    },
    // 富文本图片上传
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      console.log(file)
      // let uploadFile = {
      //   file: file
      // }
      if (file) {
        const { data } = await this.$axios.post('upload/uploadImg', file)
        // console.log(data)
        if (data.code === 0) {
          this.$message.success('上传成功!')
        } else {
          this.$message.error('上传失败')
        }
        // if (data.errorCode === 0) {
        //   let imgUrl = data.data[0].filePath
        //   let url = process.env.NODE_ENV === 'production' ? location.origin + '/marketingPC' + imgUrl: 'http://test.kelefan.cn:8080/marketingPC' + imgUrl
        //     Editor.insertEmbed(cursorLocation, "image", url);
        //     resetUploader()
        // } else {
        //   this.$message.error(data.errorMsg)
        // }
      }
    },
    //  提交
    submit () {
      this.$refs.submitForm.validate(async valied => {
        if (!valied) return false
        const { data } = await this.$axios.post('achievement', this.submitForm)
        // console.log(data)
        if (data.code === 0) {
          this.$message.success('添加成功')
          this.$router.push('/listlook')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 重置
    resetForm () {

    }
  }
}
</script>

<style lang="less" scoped>
.submit {
  .el-form {
    padding: 0 100px;
    background-color: #fff;
    .btns {
      display: flex;
      justify-content: space-around;
      padding-bottom: 40px;
      .el-button {
        padding: 12px 45px;
      }
    }
    p {
      font-size: 24px;
      font-weight: 800;
      // margin-bottom: 50px;
      line-height: 80px;
    }
  }
    .el-select {
    display: block
  }
  .quillWrapper {
    background-color: #fff;
  }
  .upload-demo {
    text-align: left;
  }
}
</style>
