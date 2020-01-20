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
      <el-step title="步骤 1" status="process" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤 2" status="process" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤 3" status="process" description="这是一段很长很长很长的描述性文字"></el-step>
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

  }
</style>
