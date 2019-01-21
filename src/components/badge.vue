<template>
  <div class="badge">
    <slot></slot>
    <span class="num">12</span>
  </div>
</template>
<style lang="stylus">
.badge
  position relative
  .num
    display: block
    width: 20px
    height: 15px
    background-color: #F56C6C
    top: 15px
    right: 0px
    position: absolute
    float: right
    line-height: 15px
    border-radius: 10px
    color: #fff
</style>

