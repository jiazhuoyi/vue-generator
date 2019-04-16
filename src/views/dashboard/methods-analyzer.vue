<template>
  <div class="methods-analyzer">
    <el-card class="box-card" shadow="never">
      <div ref="myEchart" class="chart"></div>
    </el-card>
  </div>
</template>

<script>
const echarts = require('echarts');

export default {
  mounted() {
    const myChart = echarts.init(this.$refs.myEchart);
    myChart.setOption({
      title: {
        text: '请求追踪（前五名）'
      },
      tooltip: {},
      xAxis: {
        data: ['login', 'notices', 'article', 'user-info', 'update']
      },
      yAxis: {},
      series: [{
        name: '请求次数',
        type: 'bar',
        data: [5, 10, 36, 10, 13]
      }]
    });
  }
}
</script>

<style lang="stylus" scoped>
.methods-analyzer
  .chart
    width: 100%
    height: 400px
</style>


