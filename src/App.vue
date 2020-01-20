<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: '微软雅黑';
  }
  html,body,#app {
    height: 100%;
    .el-breadcrumb {
      height: 40px;
      line-height: 40px;
      background-color: #ddd;
      padding-left: 15px;
      margin-bottom: 15px;
    }
    .el-table .cell {
     text-align: center;
    }
  }
</style>
