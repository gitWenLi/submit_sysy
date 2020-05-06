// 科研成果审批（登记）流程
<template>

  <div class="process_look">

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>科研成果登记</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果审批（登记）流程</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 步骤条 -->
    <el-steps direction="vertical">
      <el-step title="Step1：用户上传科研成果" status="process" description="用户选择自己的科研成果类别，在富文本中编写自己的内容，还可以上传附件，供给管理员查看审批"></el-step>
      <el-step title="Step2：管理员审批" status="process" description="管理员可预先设定科研成果类别，供用户选择类别；用户所提交的科研成果，交由管理员审批"></el-step>
      <el-step title="Step3: 用户科研成果登记结果" status="process" description="管理员审批科研成果，如若审批不通过，会返回给用户记录，一般会带有审批批注，供用户查看；如若审批通过，也会返给用户记录，并且会展示在科研成果中，供他人预览"></el-step>
    </el-steps>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('.el-step:last-of-type .el-step__line').style.display = 'block'
      document.querySelector('.el-step__line-inner').style.display = 'none'
    })
  }
}
</script>

<style lang="less" scoped>
  .process_look {
    /deep/.el-step__description.is-process {
      line-height: 100px;
      font-size: 14px;
    }
  }
</style>
