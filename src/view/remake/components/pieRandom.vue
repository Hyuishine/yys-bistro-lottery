<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 09:04:27
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 11:20:21
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div id="pieRandom"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      pieDom: null,
    }
  },
  mounted () {
    this.drawPie()
    setInterval(() => {
      this.doing()
    }, 100)
  },
  beforeDestroy () {
    this.pieDom.clear()
    this.pieDom.dispose()
  },
  methods: {

    doing () {
      let option = this.pieDom.getOption()

      let i = option.series[0].data[0].value
      i++
      if (i >= 101) {
        i = 0
      }
      option.series[0].data[0].value = i
      this.pieDom.setOption(option)
    },

    drawPie () {
      this.pieDom = echarts.init(
        document.getElementById('pieRandom'),
      )
      let i = 0
      setInterval(() => {
        i++
        if (i === 100) i = 0
      }, 100)


      var echartData = [{
        value: 1,
        name: '人1'
      }, {
        value: 1,
        name: '人2'
      }, {
        value: 1,
        name: '人3'
      }, {
        value: 1,
        name: '人4'
      }, {
        value: 1,
        name: '人5'
      }, {
        value: 1,
        name: '人6'
      }, {
        value: 1,
        name: '人7'
      }, {
        value: 1,
        name: '人8'
      }, {
        value: 1,
        name: '人9'
      }, {
        value: 1,
        name: '人10'
      }, {
        value: 1,
        name: '人11'
      }, {
        value: 1,
        name: '人12'
      }, {
        value: 1,
        name: '人13'
      }, {
        value: 1,
        name: '人14'
      }, {
        value: 1,
        name: '人15'
      }, {
        value: 1,
        name: '人16'
      }, {
        value: 1,
        name: '人17'
      }, {
        value: 1,
        name: '人18'
      }, {
        value: 1,
        name: '人19'
      }, {
        value: 1,
        name: '人20'
      }, {
        value: 1,
        name: '人21'
      }, {
        value: 1,
        name: '人22'
      }, {
        value: 1,
        name: '人23'
      }, {
        value: 1,
        name: '人24'
      }, {
        value: 1,
        name: '人25'
      }, {
        value: 1,
        name: '人26'
      }, {
        value: 1,
        name: '人27'
      }, {
        value: 1,
        name: '人28'
      }]
      this.pieDom.setOption({
        // backgroundColor: '#0E1327',
        tooltip: {
          formatter: "{b}"
        },

        series: [
          //! 指针层
          {
            name: "内部指针",
            type: "gauge",
            zLevel: 1,
            // splitNumber: 1,
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            detail: {
              offsetCenter: [0, 82],
              textStyle: {
                padding: [0, 0, 0, 0],
                fontSize: 18,
                fontWeight: '700',
                color: 'black'
              }
            },
            startAngle: 0,
            endAngle: 360,
            title: { //标题
              show: true,
              offsetCenter: [0, 46], // x, y，单位px
              textStyle: {
                color: "white",
                fontSize: 14, //表盘上的标题文字大小
                fontWeight: 400,
              }
            },
            data: [{
            //   name: "选中的人",
              value: 90,
            }],
            //! 指针
            pointer: {
              show: true,
              length: '55%',
              radius: '50%',
              width: 10, //指针粗细
            },
            animationDuration: 4000,
          },
          {
            name: '人员池',
            type: 'pie',
            radius: ['40%', '50%'],
            hoverAnimation: false,
            labelLine: {
              show: false
            },
            data: echartData
          },
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#pieRandom {
  height: 500px;
  canvas {
    height: 100%;
  }
}
</style>