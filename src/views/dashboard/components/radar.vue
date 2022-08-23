<template>
  <div id="radar"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    this.initRadar()
  },
  methods: {
    initRadar() {
      const myChart = echarts.init(document.getElementById('radar'))

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '人员绩效表'
        },
        legend: {
          //   left: '18%',
          data: ['张三', '李四']
        },
        radar: {
          // shape: 'circle',
          center: ['50%', '50%'],
          indicator: [
            { name: '考勤', max: 100 },
            { name: '技术', max: 100 },
            { name: '管理', max: 100 },
            { name: '分享', max: 100 },
            { name: 'bug', max: 100 },
            { name: '助人', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [80, 70, 80, 90, 80, 90],
                name: '张三'
              },
              {
                value: [100, 80, 70, 100, 80, 70],
                name: '李四'
              }
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
#radar {
  width: 500px;
  height: 450px;
}
</style>
