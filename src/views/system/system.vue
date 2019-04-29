<template>
  <div class="system">
    <el-card class="box-card" shadow="never">
      <div ref="myEchart" class="chart"></div>
    </el-card>
  </div>
</template>

<script>

export default {
  mounted() {
    const myChart = echarts.init(this.$refs.myEchart);
    const options = {
      title: {
        text: '内存使用率'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: []
        // data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
      }],
      yAxis: [{
        type: 'value',
        silent: 'true',
        axisTick: {
          show: false
        },
        min: 0,
        max: 1
      }],
      // animationDurationUpdate: 5000,
      series: [{
        // type: 'line',
        // // smooth: true,
        // symbol: 'circle',
        // symbolSize: 5,
        // showSymbol: false,
        // areaStyle: {
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //     offset: 0,
        //     color: 'rgba(219, 50, 51, 0.4)'
        //   }, {
        //      offset: 0.8,
        //       color: 'rgba(219, 50, 51, 0.1)'
        //   }], false),
        //   // shadowColor: 'rgba(0, 0, 0, 0.1)',
        //   // shadowBlur: 10
        // },
        // lineStyle: {
        //   color: 'rgb(245,86,78)',
        //   width: 6
        // },
        // animationDurationUpdate: 3000,
        animationDelay: idx => idx * 10,
        // data: [0.8, 0.7, 0.9, 0.33, 0.44, 0.58, 0, 0.55]
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            color: 'rgb(245,86,78)',
            width: 3
          }
        },
        data: []
        // data: [0, 0, 0, 0, 0, 0, 0, 0]
      }]
    };
    myChart.setOption(options);
    setInterval(() => {
      console.log('----setInterval');
      const options1 = myChart.getOption();
      console.log('---options1:', options1);
      if (options1.xAxis[0].data.length >= 7) {
        options1.xAxis[0].data.shift();
      }
      if (options1.series[0].data.length >= 8) {
        options1.series[0].data.shift();
      }
      const date = new Date();
      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const radomNum = Math.random();
      options1.xAxis[0].data.push(time);
      options1.series[0].data.push(radomNum);
      myChart.setOption(options1);
      // console.log('xdata:', xdata);
      // console.log('valData:', valData);
    }, 3000);
  }
};
</script>

<style lang="stylus" scoped>
.system
  .chart
    width: 100%
    height: 400px
</style>
