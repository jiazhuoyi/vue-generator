<template>
  <div class="main">
    <navbar></navbar>
    <div class="app-wrapper">
      <sidebar class="sidebar-container" :side-bar="sidenav"></sidebar>
      <div class="main-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import route from '@/router';

export default {
  name: 'Main',
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      sidenav: []
    };
  },
  created() {
    this.sidenav = [];
    route.options.routes.forEach((item) => {
      if (item.icon) {
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
  .app-wrapper
    width: 100%;
    margin-top: $nav-height
    position: relative
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
      box-sizing: border-box
      position: relative
      margin-left: $sidebar-width
</style>
