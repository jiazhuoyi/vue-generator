<template>
  <div class="badge">
    <slot></slot>
    <span class="num" v-show="!isHidden">{{content}}</span>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    max: Number,
    value: Number,
    isHidden: Boolean
  },
  computed: {
    content() {
      return this.value > this.max ? `${this.max}+` : this.value;
    }
  }
};
</script>

<style lang="stylus">
.badge
  position relative
  .num
    display: block
    min-width: 30px
    height: 20px
    background-color: #F56C6C
    top: 10px
    right: -30%
    position: absolute
    float: right
    line-height: 20px
    border-radius: 10px
    color: #fff
</style>

