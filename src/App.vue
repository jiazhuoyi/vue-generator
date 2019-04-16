<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="stylus">
@import "~@/styles/index"
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $app-color
  width: 100%;
  height: 100%;
body
  width: 100%
  height: 100%
  margin: 0px
  padding: 0px
html
  width: 100%
  height: 100%
a
  text-decoration: none
  color: #303133
</style>
