<template>
  <div class="login-analyzer">
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
        text: '系统近期访问次数'
      },
      tooltip: {},
      xAxis: {
        data: ['04-11', '04-12', '04-13', '04-14', '04-15', '04-16']
      },
      yAxis: {},
      series: [{
        name: '访问次数',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
}
</script>

<style lang="stylus" scoped>
.login-analyzer
  .chart
    width: 100%
    height: 400px
</style>


