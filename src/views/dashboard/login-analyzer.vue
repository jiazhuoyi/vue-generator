<template>
  <div class="login-analyzer">
    <el-card class="box-card" shadow="never">
      <div ref="myEchart" class="chart"></div>
    </el-card>
  </div>
</template>

<script>
// import echarts from '@/utils/echarts';
import { getLoginlogs } from '@/api/user';

export default {
  async mounted() {
    const { loginlogs } = await getLoginlogs();
    console.log('---result:', loginlogs);
    const myChart = echarts.init(this.$refs.myEchart);
    myChart.setOption({
      title: {
        text: '系统近期访问次数'
      },
      tooltip: {},
      xAxis: {
        data: loginlogs.dates
      },
      yAxis: {},
      series: [{
        name: '访问次数',
        type: 'bar',
        data: loginlogs.counts
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


