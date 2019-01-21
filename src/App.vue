<template>
  <!-- <div id="app">
    <div class="app-wrapper">
      <navbar></navbar>
      <div></div>
      <sidebar class="sidebar-container"></sidebar>

      <div class="main-container">
        <div class="main-page">
          <router-view/>
        </div>
      </div>
    </div>
  </div> -->
  <div id="app">
    <navbar></navbar>
    <div class="app-wrapper">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

export default {
  name: 'App',
  components: {
    Sidebar,
    Navbar
  }
};
</script>

<style lang="stylus">
body {
  margin: 0px
  padding: 0px
  background-color: #E2E2E2
}

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%
  height: 100%
  position: relative
  .app-wrapper
    width: 100%;
    height: 100%
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
