<template>
  <div>

    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" router
      background-color="#002984" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item @click="drawer = true"> <i class="el-icon-menu"></i><span slot="title">菜单</span></el-menu-item>
      <!--<el-menu-item  index="/">
        <template slot="title">
          <div style="font-size: 22px;text-align:center">广东警官学院</div>
        </template>
      </el-menu-item>
      <el-menu-item style="margin-left: 2%;" index="/bulltin">公告</el-menu-item>
      <el-menu-item index="/ctf">CTF练习</el-menu-item>
      <el-menu-item index="/CourseList">课程学习</el-menu-item>-->



      <div v-if="isLogin">
        <el-submenu index="/user" style="float:right;">
          <template slot="title"> {{ userName }} <i class="el-icon-user"></i></template>

          <el-menu-item index="/user/profile">用户中心</el-menu-item>
          <el-menu-item index="/user/repassword">修改密码</el-menu-item>
          <el-menu-item v-if="isAdmin" index="/admin">后台管理</el-menu-item>
          <el-menu-item index="/user/logout">注销</el-menu-item>

        </el-submenu>
      </div>
      <div v-else>
        <el-menu-item index="/user/login" style="float:right;">登录</el-menu-item>
        <el-menu-item index="/user/register" style="float:right;">注册</el-menu-item>
      </div>
    </el-menu>

    <el-drawer :visible.sync="drawer" :direction="direction" size="20%" :show-close="showClose">
      <template slot="title">
        <div
          style="cursor: pointer; font-size: 24px; color: rgb(255, 255, 255); line-height: 64px; font-weight: 300; background-color: rgb(25, 118, 210); padding-left: 24px; margin-bottom: 8px;width:100%">
          GDPC</div>
      </template>
      <el-menu router default-active="/" @open="handleOpen">
        <el-menu-item index="/"  @click="drawer = false" >主页</el-menu-item>
        <el-menu-item index="/bulletin" @click="drawer = false">公告</el-menu-item>
        <el-menu-item index="/ctf" @click="drawer = false">CTF练习</el-menu-item>
        <el-menu-item index="/Course" @click="drawer = false" >课程学习</el-menu-item>

        <el-submenu index="1">
          <template slot="title">友情链接</template>
          <el-menu-item-group>
            <template slot="title">
              <div style="font-size:18px">协会</div>
            </template>
            <el-menu-item index="1"><a href="https://x10sec.org">X10Sec</a></el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <div style="font-size:18px">CTF</div>
            </template>
            <el-menu-item index="2"><a href="https://ctftime.org/">ctftime</a></el-menu-item>
            <el-menu-item index="3"><a href="http://ctf.gs">CTF导航</a></el-menu-item>


          </el-menu-item-group>

        </el-submenu>
      </el-menu>
    </el-drawer>
    <router-view></router-view>
    <footer style="font-size:15px;box-sizing: border-box; text-align: center;width:100%">
      <br>
      <p style="margin: 0px auto; padding: 0px; max-width: 356px;">GDPC Platform</p>
      <p style="margin: 0px auto; padding: 0px; max-width: 356px;">Copyright ©2019 <em>GDPC Platform</em></p>
      <p style="margin: 0px auto; padding: 0px;  max-width: 356px;">Created using <a
          href="https://cn.vuejs.org/">vue.js</a>&<a href="https://element.eleme.cn">element-ui</a></p>
      <br>
      <br>
      <br>
    </footer>
  </div>
</template>

<style scoped>

</style>

<script>
  import User from '@/api/User'

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        inited: false,
        drawer: false,
        direction: 'ltr',
        showClose: false,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin
      },
      isAdmin() {
        return this.$store.state.isAdmin
      },
      userName() {
        return this.$store.state.userName
      }
    },
    async mounted() {
      try {
        let result = await User.getUserInfo();
        if (result.data.code === 200) {

          this.$store.commit('setUserName', result.data.data.name);
          this.$store.commit('login');
          this.$store.state.token = result.data.data.token;
          this.$store.commit('setUserScore', result.data.data.score);
          //alert(this.$store.state.isLogin)
          if (result.data.data.admin) {
            this.$store.commit('enterAdminMode')
          }
          this.inited = true
        }
      } catch (error) {
        //console.log(JSON.stringify(error))
        this.inited = true;
      }

    }


  }
</script>

<style scoped>
  .footer {
    background: #E3E6E8;
    position: absolute;
    text-align: center;
    width: 100%;
    padding: 2rem 0;
    height: auto;
  }

  .top {
    position: absolute;
    top: 0px;
    text-align: center;
    width: 389px;
    height: auto;

  }
</style>