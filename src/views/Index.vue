<template>
  <div class="index home">
    <el-container>
      <el-aside width="200px">
          <div class="logo"></div>
          <el-menu
            :unique-opened='true'
            :router='true'
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                     <span>用户列表</span>
                    </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="article">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                     <span>文章列表</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="publish">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                     <span>文章分布</span>
                    </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>栏目管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                     <span>栏目列表</span>
                    </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
      </el-aside>
      <el-container>
        <el-header class="welcome">
            <div class="left icon-paragraph-justify system-title " ></div>
            <div class="middle system-title" >黑马头条后台管理系统</div>
            <div class="right">
                <span>欢迎你：Josie</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span @click="logout" class="logout">退出</span>
            </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$router.push({ name: 'login' })
      localStorage.removeItem('hl_back_token')
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  .el-menu{
      border-right:0px;
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
    padding-left:0px;
  }
  .welcome{
    color: white;
  }
  .logout{
    cursor: pointer;
  }
}

</style>
