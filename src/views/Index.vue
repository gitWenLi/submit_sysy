<template>
  <div class="index">
    <el-container>
        <el-header height="80px">
          <!-- <img class="hh_logo" src="../assets/logo.jpg" alt=""> -->
          <h1>科研成果登记系统</h1>
          <div class="hh_user">
            <!-- <a class="el-icon-news">
              <i>我的消息3</i>
            </a> -->
            <a href="" class="hh_news">
                  <el-tooltip class="item" effect="dark" content="我的消息" placement="top">
                    <img class="hh_head" src="../assets/head.png" alt="">
                  </el-tooltip>
                  <span></span>
            </a>
            <p>当前用户:123456</p>
            <el-button round size="mini">登出</el-button>
          </div>
        </el-header>
        <el-container>
            <el-aside >
                <el-col>
                  <el-menu
                    router
                    :default-active="getpath"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item index="index">
                      <i class="el-icon-menu"></i>
                      <span slot="title">首页</span>
                    </el-menu-item>
                    <!-- 科研成果 -->
                      <el-submenu index="1" :default-active="getpath">
                        <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>科研成果</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item index="/listlook"><i class="el-icon-d-arrow-right"></i>科研成果预览</el-menu-item>
                          <el-menu-item index="/listquery"><i class="el-icon-d-arrow-right"></i>科研成果查询</el-menu-item>
                          <el-menu-item index="/submit"  v-if="isAdministrator == 'false'" ><i class="el-icon-d-arrow-right"></i>科研成果上传登记</el-menu-item>
                          <el-menu-item index="/manage"  v-if="isAdministrator == 'true'"  ><i class="el-icon-d-arrow-right"></i>科研成果管理</el-menu-item>
                        </el-menu-item-group>
                      </el-submenu>

                    <!-- 科研成果登记（审批）  -->
                    <el-submenu index="2">
                      <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span v-if="isAdministrator == 'false'" >科研成果登记</span>
                        <span v-if="isAdministrator == 'true'" >科研成果审批</span>
                      </template>
                        <el-menu-item index="/processagreen" v-if="isAdministrator == 'false'" ><i class="el-icon-d-arrow-right"></i>科研成果登记</el-menu-item>
                        <el-menu-item index="/processagreen" v-if="isAdministrator == 'true'" ><i class="el-icon-d-arrow-right"></i>科研成果审批</el-menu-item>
                        <el-menu-item index="/processlook"><i class="el-icon-d-arrow-right"></i>科研成果登记（审批）流程</el-menu-item>
                        <el-menu-item index="/processrecord" v-if="isAdministrator == 'false'" ><i class="el-icon-d-arrow-right"></i>科研成果登记记录</el-menu-item>
                        <el-menu-item index="/processrecord" v-if="isAdministrator == 'true'" ><i class="el-icon-d-arrow-right"></i>科研成果审批记录</el-menu-item>
                    </el-submenu>

                    <!-- 科研成果交流 -->
                    <el-submenu index="3">
                      <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>科研成果交流</span>
                      </template>
                        <el-menu-item index="/community"><i class="el-icon-d-arrow-right"></i>交流社区</el-menu-item>
                        <el-menu-item index="/aboutmy"><i class="el-icon-d-arrow-right"></i>关于我的</el-menu-item>
                    </el-submenu>

                    <!-- 我的科研成果登记（审批） -->
                    <el-submenu index="4">
                      <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span v-if="isAdministrator == 'false'" >我的科研成果登记</span>
                        <span v-if="isAdministrator == 'true'" >我的科研成果审批</span>
                      </template>
                        <el-menu-item index="/currentstatus" v-if="isAdministrator == 'false'"><i class="el-icon-d-arrow-right"></i>当前登记状态</el-menu-item>
                        <el-menu-item index="/historyuser" v-if="isAdministrator == 'false'"><i class="el-icon-d-arrow-right"></i>历史登记记录</el-menu-item>
                        <el-menu-item index="/historyadmin" v-if="isAdministrator == 'true'"><i class="el-icon-d-arrow-right"></i>历史审批记录</el-menu-item>
                    </el-submenu>

                    <!-- 个人管理 -->
                    <el-submenu index="5" >
                      <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>个人管理</span>
                      </template>
                        <el-menu-item index="/personalinfo"><i class="el-icon-d-arrow-right"></i>个人信息</el-menu-item>
                        <el-menu-item index="/changeinfo"><i class="el-icon-d-arrow-right"></i>修改个人信息</el-menu-item>
                        <el-menu-item index="/manageuser" v-if="isAdministrator == 'true'"><i class="el-icon-d-arrow-right" ></i>普通用户账号管理</el-menu-item>
                        <el-menu-item index="/addadmin" v-if="isAdministrator == 'true'"><i class="el-icon-d-arrow-right" ></i>添加管理员</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-col>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isCollapse: true,
      isAdministrator: localStorage.getItem('isAdministrator')
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    getpath () {
      console.log('isAdministrator', this.isAdministrator)
      return this.$route.path.slice(1).split('-')[0]
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.index {
    height: 100%;
      .el-header, .el-footer {
    // background-color: #5A98D2;
    background:url("../assets/top.png");
    color: #333;
    text-align: center;
    line-height: 80px;
  }
  .el-header {
    position: relative;
    .hh_logo {
      width: 300px;
      height: 80px;
      position: absolute;
      top: 0;
      left: 0;
    }
    h1{
      color: #fff;
      overflow: hidden;
      text-align: center;
    }
    .hh_user {
      position: absolute;
      right:20px;
      top: 0;
      p {
        float: left;
        margin-right: 10px;
        font-size: 14px;
        color: #fff;
      }
      .hh_head {
        width: 40px;
        height: 40px;
        float: left;
        margin-top: 20px;
        margin-right: 10px;
        border-radius: 50%;
      }
      .hh_news {
        clear: both;
        display: block;
        position: relative;
        float: left;
        span {
          position: absolute;
          top: 18px;
          left: 28px;
          background-color: #ED171F;
          width: 12px;
          height: 12px;
          border-radius: 7px;
          color: #fff;
        }
      }
    }
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
    position: relative;
    .el-submenu, .el-menu-item{
        text-align: left;
    }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-container {
    height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

}
</style>
