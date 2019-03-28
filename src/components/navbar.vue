<template>
  <div class="navbar">
    <router-link to="/" class="site">
      <img src="../../static/icons/logo.png" alt="" class="logo">
      <span>Vue-generator</span>
    </router-link>
    <div class="right-menu">
      <router-link to="/notice">
        <el-tooltip effect="dark"
          :content="`您有${$store.state.notice.totalCount}条未读消息`"
          placement="bottom">
          <div class="notice">
            <badge :max="noticeMax" :value="$store.state.notice.totalCount" :is-hidden="isHidden">
              <!-- <img class="avatar" src="../../static/icons/notice.svg"> -->
              <i class="iconfont avatar icon-tongzhi"></i>
            </badge>
          </div>
        </el-tooltip>
      </router-link>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="my">
          <avatar :url="$store.state.user.avatar" width="40" height="40"></avatar>
          <span class="right-item">{{$store.state.user.name}}</span>
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
import { getNoticeCount } from '@/api/notice';
import Badge from '@/components/badge';
import Avatar from '@/components/avatar';

export default {
  name: 'Navbar',
  components: {
    Badge,
    Avatar
  },
  data() {
    return {
      noticeMax: 99,
      noticeCount: 12,
      isHidden: false
    };
  },
  async mounted() {
    const result = await getNoticeCount();
    this.$store.commit('setTotalCount', result.totalCount);
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        const account = this.$store.state.user.account;
        this.$store.dispatch('logout', account).then(() => {
          this.$message({
            message: '退出登录',
            type: 'success'
          });
          this.$router.push({ path: '/login' });
        }).catch((error) => {
          this.$message({
            message: error.msg,
            type: 'error'
          });
        });
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
  border-bottom: 1px solid #d8dce5
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04)
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
        line-height: $navLogoHeight
        font-size: 25px
        vertical-align: middle
    .my
      display: inline-block
      line-height: $nav-height
      cursor: pointer
      .avatar
        // display: inline
        // width: $navLogoWidth
        // height: $navLogoHeight
        // vertical-align: middle
        // border-radius: 50%
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

