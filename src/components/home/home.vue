<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
            <img src="../../assets/logo.png" alt="无法显示图片" class="img">
        </el-col>
        <el-col :span="18" class="middle">
          <h3>后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout" @click.prevent="handleSignout()" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!--侧边栏导航el-menu-->
        <!--开启路由模式-->
        <el-menu
        :router="true"
        :unique-opened="true">
          <el-submenu :index="''+item1.cid" v-for="(item1,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
              <el-menu-item
              :index="item2.path"
              v-for="(item2,index) in item1.children"
              :key="index" >
                <i class="el-icon-location"></i>
                <span>{{item2.authName}}</span>
              </el-menu-item>
            </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  // newVue之前自动触发
  beforeCreate () {
    // 获取token
    /* const token = localStorage.getItem('token')
    if (!token) {
      // token 没有 > 登录
      this.$router.push({name: 'login'})
    } */
    // if token 有 > 继续渲染组件
  },
  created () {
    this.getMenus()
  },
  methods: {
    // 获取导航数据
    async getMenus () {
      const res = await this.$http.get(`menus`)
      /* console.log(res) */
      this.menus = res.data.data
    },
    handleSignout () {
      // 1.清除token
      localStorage.clear()
      // 2.提示
      this.$message.success('退出成功')
      // 3.来到Login组件
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
  .container{
    height: 100%;
  }
  .header{
    background-color: #b3c0d1;
  }
  .aside{
    background-color: #d3dcd6;
  }
  .main{
    background-color: #e9eef3;
  }
  .middle{

    text-align: center;
  }
  .loginout{
    line-height: 60px;
    text-decoration: none;
  }
  .img{
    height: 60px;
    width: 199px;
    margin-left: -19px;
  }
</style>
