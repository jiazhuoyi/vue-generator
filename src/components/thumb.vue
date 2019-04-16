<template>
  <div class="thumb"
    :style="{ backgroundImage: 'url(' + src + ')', width: width + 'px', height: height + 'px'}">
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    width: String,
    height: String
  },
  computed: {
    src() {
      return `https://cdn.jiazhuoyi.cn/${this.url}`;
    }
  }
};
</script>

<style lang="stylus" scoped>
  .thumb
    position: relative
    background: $gray-lighter no-repeat
    background-size: cover
    background-position: center
</style>

