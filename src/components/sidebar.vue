<template>
  <div class="sidebar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-verical-demo bar"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <sidebar-item
        v-for="(item, index) in sideBar"
        :key="item.name"
        :index="index"
        :item="item">
      </sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from '@/components/sidebar-item';

export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  props: {
    sideBar: Array
  }
};
</script>


<style lang="stylus">
.sidebar
  text-align: left
  color: $sidebar-color
  background-color: $sidebar-bg-color
  .bar
    height: 100%
</style>

