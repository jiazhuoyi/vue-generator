<template>
  <div class="mobile-swiper" @mouseenter = "cancelPlay">
    <div class="mobile-swiper-container"
      :style="containerStyle"
      :class="{ right: isRight }"
      @touchstart = "touchStart"
      @touchmove = "touchMove"
      @touchend = "touchEnd">
    <!-- <div class="mobile-swiper-container"
      :class="{ right: isRight }"
      @touchstart = "touchStart"
      @touchmove = "touchMove"> -->
      <div class="swiper-item"
        :style="{backgroundImage: backgroundUrl(list[list.length -1])}">
      </div>
      <div class="swiper-item"
        v-for="(img, index) in list"
        :key="index"
        :style="{backgroundImage: backgroundUrl(img)}">
      </div>
      <div class="swiper-item"
        :style="{backgroundImage: backgroundUrl(list[0])}">
      </div>
    </div>
    <div class="mobile-swiper-direction">
      <div class="pref arrow" @click="pref">
        <img class="img" src="../../static/icons/pref.svg" alt="">
      </div>
      <div class="next arrow" @click="next">
        <img class="img" src="../../static/icons/next.svg" alt="">
      </div>
    </div>
    <div class="mobile-swiper-dots">
      <span class="dot"
        v-for="(img, index) in list"
        :key="index"
        :class = "{ 'dot-active': index === current}"
        @click="clickDot(index)">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    containerStyle() {
      return {
        transform: `translate3d(${this.transformDistance}px, 0, 0)`
      };
    }
  },
  data() {
    return {
      timer: null,
      list: [
        '//i1.mifile.cn/a4/xmad_15528743372288_fgrUN.jpg',
        '//i1.mifile.cn/a4/xmad_1548667203841_ieyof.jpg',
        '//i1.mifile.cn/a4/xmad_15452976609747_CYJQj.jpg'
      ],
      current: 0,
      distance: 300,
      interval: 2500,
      startX: 0,
      firstCurrentX: 0,
      lastCurrentX: 0,
      endX: 0,
      isRight: false,
      transformDistance: -300
    };
  },
  methods: {
    backgroundUrl(url) {
      return `url(${url})`;
    },
    clickDot(index) {
      this.current = index;
      this.transformDistance = (this.current + 1) * (-this.distance);
    },
    pref() {
      this.subtractCount();
      if (this.transformDistance >= 0) {
        this.transformDistance = -(this.list.length - 1) * this.distance;
      } else {
        this.transform(this.distance, 1, 1);
      }
    },
    transform(offset, duration, direction) {
      let changeDistance = 0;
      const timer = setInterval(() => {
        if (Math.abs(changeDistance) >= offset) {
          clearInterval(timer);
        } else {
          changeDistance += 15 * direction;
          this.transformDistance += 15 * direction;
        }
      }, duration);
    },
    next() {
      this.addCount();
      if (this.transformDistance <= (-(this.distance * (this.list.length + 1)))) {
        this.transformDistance = -(2 * this.distance);
      } else {
        this.transform(this.distance, 0.5, -1);
      }
    },
    addCount() {
      this.current += 1;
      if (this.current > 2) {
        this.current = 0;
      }
    },
    subtractCount() {
      this.current -= 1;
      if (this.current < 0) {
        this.current = 2;
      }
    },
    cancelPlay() {
      console.log('---cancelPlay---');
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    autoplay() {
      clearInterval(this.timer);
      this.timer = setInterval(this.next, this.interval);
    },
    touchStart(e) {
      this.startX = e.touches[0].clientX;
    },
    touchMove(e) {
      this.lastCurrentX = e.touches[0].clientX;
      this.firstCurrentX = this.firstCurrentX ? this.firstCurrentX : this.startX;
      const changeDistance = this.lastCurrentX - this.firstCurrentX;
      this.transformDistance += changeDistance;
      this.firstCurrentX = this.lastCurrentX;
    },
    touchEnd(e) {
      this.endX = e.changedTouches[0].clientX;
      const touchDistance = this.endX - this.startX;
      this.transformDistance += this.endX - this.firstCurrentX;
      if (Math.abs(touchDistance) < 100) {
        this.transformDistance -= touchDistance;
      } else {
        this.transformDistance -= (this.distance - Math.abs(touchDistance));
        if (this.transformDistance < -1200 || this.transformDistance > 0) {
          this.transformDistance = -600;
        }
        if (touchDistance < 0) {
          this.addCount();
        } else {
          this.subtractCount();
        }
      }
      this.firstCurrentX = 0;
    }
  },
  mounted() {
    this.autoplay();
  }
};
</script>

<style lang="stylus" scoped>
@keyframes right {
  from: {}
}
.right
  animation: right
.mobile-swiper
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  &-container
    width: 1500px
    height: 150px
  .swiper-item
    float: left
    width: 300px
    height: 150px
    background-position: center center
    background-repeat: no-repeat
    background-size: cover
  &-direction
    .pref
      position: absolute
      left: 0
    .next
      position: absolute
      right: 0
    .arrow
      width: 20px
      height: 30px
      line-height: 30px
      top: 50%
      text-align: center
      transform: translateY(-50%)
      &:hover
        background-color: rgba(0, 0, 0, .3)
        cursor: pointer
      .img
        width: 100%
        vertical-align: middle
  &-dots
    position: absolute
    width: 100%
    bottom: 10px
    .dot
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
