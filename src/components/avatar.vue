<template>
  <div class="avatar"
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
      return `http://cdn.jiazhuoyi.cn/${this.url}`;
    }
  }
};
</script>

<style lang="stylus">
  // .avatar
  //   .img
  //     border-radius: 50%
  //     vertical-align: middle
  .avatar
    vertical-align: middle
    border-radius: 50%
    display: inline-block
    position: relative
    background: $gray-lighter no-repeat
    background-size: cover
    background-position: center
</style>

