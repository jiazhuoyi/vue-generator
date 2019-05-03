<template>
  <div class="main">
    <navbar></navbar>
    <div class="app-wrapper">
      <sidebar class="sidebar-container" :side-bar="sidenav"></sidebar>
      <div class="main-container">
        <bread-crumb></bread-crumb>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import route from '@/router';
import BreadCrumb from '@/components/bread-crumb';

export default {
  name: 'Main',
  components: {
    Sidebar,
    Navbar,
    BreadCrumb
  },
  data() {
    return {
      sidenav: []
    };
  },
  created() {
    this.sidenav = [];
    route.options.routes.forEach((item) => {
      if (item.meta && item.meta.title) {
        this.sidenav.push(item);
      }
    });
  }
};
</script>

<style lang="stylus">
@import "~@/styles/index"
.main
  width: 100%
  height: 100%
  background-color: #f0f2f5
  overflow: hidden
  .app-wrapper
    width: 100%;
    height: 100%
    overflow: auto
    margin-top: $nav-height
    position: relative
    // overflow: scroll
    .sidebar-container
      min-height: 100%
      width: $sidebar-width
      position: fixed
      top: $nav-height
      left: 0
      bottom: 0
      z-index: 1000
    .main-container
      width: auto
      min-height: 500px
      box-sizing: border-box
      position: relative
      // margin-left: $sidebar-width
      margin: 20px 20px 100px 240px
      padding: $main-padding
      background: #fff
      border-left: 1px solid #e8e8e8
      border-right: 1px solid #e8e8e8
      border-bottom: 1px solid #e8e8e8
</style>
