<template>
  <div class="mobile">
    <mobile-swiper></mobile-swiper>
    <!-- <div class="test"></div> -->
  </div>
</template>

<script>
import MobileSwiper from '@/components/mobile-swiper';

export default {
  components: {
    MobileSwiper
  }
};
</script>

<style lang="stylus" scoped>
.mobile
  width: 300px
  height: 150px
  margin: 0 auto
  .test
    width: 100%
    height: 100%
    background-image: url('//i1.mifile.cn/a4/xmad_15528743372288_fgrUN.jpg')
    background-position: center
    background-repeat: no-repeat
    background-size: cover
</style>
