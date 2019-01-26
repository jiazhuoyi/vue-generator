<template>
  <div class="navbar">
    <a href="" class="site">
      <img src="../../static/icons/logo.png" alt="" class="logo">
      <span>Vue-generator</span>
    </a>
    <div class="right-menu">
      <div class="notice">
        <badge v-bind:max="noticeMax" v-bind:value="noticeCount" v-bind:is-hidden="isHidden">
          <img class="avatar" src="../../static/icons/notice.svg">
        </badge>
      </div>
      <el-dropdown>
        <div class="my">
          <img class="avatar" src="../../static/icons/avatar.png">
          <span class="right-item">大脸猫</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div class="dropdown-item">
              <img class="my-icon" src="../../static/icons/profile.svg">
              <span>我的</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided>
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
  }
};
</script>

<style lang="stylus">
.navbar
  width: calc(100% - 20px)
  position: fixed
  top: 0px
  padding: 0px 10px
  height: 60px
  line-height: 60px
  background-color: #fff
  z-index: 1000
  .site
    position: absolute
    float: left
    width: 220px
    left: 0px
    text-decoration: none
    font-size: 20px
    font-weight: bolder
    .logo
      width: 40px
      height: 40px
      vertical-align: middle
  .right-menu
    float: right
    .notice
      display: inline-block
      margin-right: 20px
      cursor: pointer
      .avatar
        width: 40px
        height: 40px
        vertical-align: middle
    .my
      display: inline-block
      line-height: 60px
      cursor: pointer
      .avatar
        width: 40px
        height: 40px
        vertical-align: middle
      .right-item
        line-height: 60px
        font-weight: bolder
.dropdown-item
  .my-icon
    vertical-align: middle
    width: 18px
    height: 18px
    margin-right: 10px
</style>

