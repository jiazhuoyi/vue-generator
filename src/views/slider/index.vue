<template>
  <div class="slider">
    <div class="pc-swiper">
      <swiper
        :images="images"
        :autoplay="true"
        :interval="2500">
      </swiper>
    </div>
    <div class="document">
      <p>pc端的轮播图：（不支持移动端的左右滑动）</p>
      <el-table
        :data="descTable" border>
        <el-table-column prop="arg" label="参数" align="center">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="说明"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="isRequired"
          label="是否必填"
          align="center">
        </el-table-column>
        <el-table-column
          prop="defaultValue"
          label="默认值"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/swiper';

export default {
  components: {
    Swiper
  },
  data() {
    return {
      images: [
        '//i1.mifile.cn/a4/xmad_15528743372288_fgrUN.jpg',
        '//i1.mifile.cn/a4/xmad_1548667203841_ieyof.jpg',
        '//i1.mifile.cn/a4/xmad_15452976609747_CYJQj.jpg'
      ],
      descTable: [
        {
          arg: 'images',
          desc: '轮播图片数组',
          type: 'Array',
          isRequired: '必填',
          defaultValue: '-'
        }, {
          arg: 'autoplay',
          desc: '是否自动轮播',
          type: 'Boolean',
          isRequired: '-',
          defaultValue: 'true'
        }, {
          arg: 'interval',
          desc: '自动切换间隔时长(ms)',
          type: 'Number',
          isRequired: '-',
          defaultValue: '2500'
        }, {
          arg: 'arrow',
          desc: '是否使用箭头',
          type: 'Boolean',
          isRequired: '-',
          defaultValue: 'true'
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.slider
  .pc-swiper
    height: 0;
    padding-bottom: 37.5%
    margin: 0 auto
  .document
    width: 70%
    margin: 0 auto
</style>

