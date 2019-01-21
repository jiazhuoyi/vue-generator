<template>
  <div class="sidebar">
    <!-- <div>侧边栏</div> -->
    <el-menu
      default-active="2"
      class="el-menu-verical-demo bar"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航五</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="stylus">
.sidebar
  color: #fff
  background-color: #304156
  .bar
    height: 100%
</style>

