<template>
  <div class="navbar">
    <router-link to="/" class="site">
      <img src="../../static/icons/logo.png" alt="" class="logo">
      <span>Vue-generator</span>
    </router-link>
    <div class="right-menu">
      <div class="notice">
        <badge :max="noticeMax" :value="noticeCount" :is-hidden="isHidden">
          <img class="avatar" src="../../static/icons/notice.svg">
        </badge>
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="my">
          <img class="avatar" src="../../static/icons/avatar.png">
          <span class="right-item">大脸猫</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="my">
            <div class="dropdown-item">
              <img class="my-icon" src="../../static/icons/profile.svg">
              <span>我的</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="logout" divided>
            <div class="dropdown-item">
              <img class="my-icon" src="../../static/icons/logout.svg">
              <span>退出</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Badge from '@/components/badge';

export default {
  name: 'Navbar',
  components: {
    Badge
  },
  data() {
    return {
      noticeMax: 99,
      noticeCount: 12,
      isHidden: false
    };
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$router.push({ path: '/login' });
      } else if (command === 'my') {
        this.$router.push({ path: '/my/info' });
      } else {
        this.$router.push({ path: '/dashboard' });
      }
    }
  }
};
</script>

<style lang="stylus">
@import "~@/styles/index"
.navbar
  width: 100%
  box-sizing: border-box
  position: fixed
  top: 0px
  padding: 0px $nav-padding
  height: $nav-height
  line-height: $nav-height
  background-color: $navbackgroundColor
  z-index: 1000
  .site
    position: absolute
    float: left
    width: $navSiteWidth
    left: 0px
    text-decoration: none
    font-size: 20px
    font-weight: bolder
    .logo
      width: $navLogoWidth
      height: $navLogoHeight
      vertical-align: middle
  .right-menu
    float: right
    .notice
      display: inline-block
      margin-right: 20px
      cursor: pointer
      .avatar
        width: $navLogoWidth
        height: $navLogoHeight
        vertical-align: middle
    .my
      display: inline-block
      line-height: $nav-height
      cursor: pointer
      .avatar
        width: $navLogoWidth
        height: $navLogoHeight
        vertical-align: middle
      .right-item
        line-height: $navLogoHeight
        font-weight: bolder
.dropdown-item
  .my-icon
    vertical-align: middle
    width: 18px
    height: 18px
    margin-right: 10px
</style>

