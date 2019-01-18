<template>
  <div id="app">
    <div class="app-wrapper">
      <sidebar class="sidebar-container"></sidebar>
      <!-- <img src="./assets/logo.png"> -->
      <div class="main-container">
        <navbar></navbar>
        <div class="main-page">
          <router-view/>
        </div>
      </div>
      <!-- <router-view/> -->
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
  &:after
    display: block
    clear: both
    content: ""
    visibility: hidden
    height: 0
.app-wrapper
  width: 100%
  height: 100%
  position: relative
  .sidebar-container
    min-height: 100%
    width: 180px
    position: fixed
    top: 0px
    left: 0
    bottom: 0
    z-index: 1000
  .main-container
    width: 100%
    position: relative
    margin-left: 180px
</style>
