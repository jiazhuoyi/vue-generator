<template>
  <div class="swiper" @mouseenter = "cancelPlay" @mouseleave = "autoPlay">
    <div class="img-container"
      v-for="(img, index) in images"
      v-show="index == current"
      :key="index">
      <img class="img" :src="img" :title="index">
    </div>
    <div class="direction" v-if="arrow">
      <div class="pref arrow" @click="pref">
        <img class="img" src="../../static/icons/pref.svg" alt="">
      </div>
      <div class="next arrow" @click="next">
        <img class="img" src="../../static/icons/next.svg" alt="">
      </div>
    </div>
    <div class="dots">
      <span class="dots-click"
        v-for="(img, index) in images"
        :key="index"
        :class = "{ 'dots-click-active': index === current}"
        @click="clickBar(index)">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2500
    },
    arrow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      current: 0,
      timer: null
    };
  },
  created() {
    this.autoPlay();
  },
  methods: {
    clickBar(index) {
      this.current = index;
    },
    autoPlay() {
      if (this.autoplay) {
        this.cancelPlay();
        this.timer = setInterval(this.changeImg, this.interval);
      }
    },
    changeImg() {
      if (this.current >= this.images.length - 1) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    },
    cancelPlay() {
      if (this.timer && this.autoplay) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    pref() {
      if (this.current <= 0) {
        this.current = this.images.length - 1;
      } else {
        this.current -= 1;
      }
    },
    next() {
      if (this.current >= this.images.length - 1) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.swiper
  width: 100%
  position: relative
  .img-container
    display: inline-block
    width: 100%
    height: 100%
    .img
      width: 100%
  .direction
    .pref
      position: absolute
      left: 0
    .next
      position: absolute
      right: 0
    .arrow
      width: 40px
      height: 60px
      line-height: 60px
      top: 50%
      text-align: center
      transform: translateY(-50%)
      &:hover
        background-color: rgba(0, 0, 0, .3)
        cursor: pointer
      .img
        width: 100%
        vertical-align: middle
  .dots
    position: absolute
    width: 100%
    bottom: 10px
    margin: 0 auto
    z-index: 101
    text-align: center
    &-click
      width: 6px
      height: 6px
      border: 2px solid #fff
      border-color: rgba(255, 255, 255, 0.3)
      border-radius: 6px
      display: inline-block
      margin-right: 10px
      background: rgba(0, 0, 0, 0.4)
      &:hover
        cursor: pointer
        color: #757575
        border-color: rgba(0, 0, 0, 0.4)
        background: #fff
      &-active
        color: #757575
        border-color: rgba(0, 0, 0, 0.4)
        background: #fff
</style>
