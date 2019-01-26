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
.app-wrapper
  width: 100%;
  margin-top: 60px
  position: relative
  .sidebar-container
    min-height: 100%
    width: 220px
    position: fixed
    top: 60px
    left: 0
    bottom: 0
    z-index: 1000
  .main-container
    width: calc(100% - 220px)
    position: relative
    margin-left: 220px
</style>
