<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 09:04:27
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 10:31:07
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
  },
  beforeDestroy () {
    this.pieDom.clear()
    this.pieDom.dispose()
  },
  methods: {
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
        value: 21,
        name: '市场签约1'
      }, {
        value: 38,
        name: '市场签约2'
      }, {
        value: 35,
        name: '市场签约3'
      }, {
        value: 31,
        name: '市场签约4'
      }, {
        value: 28,
        name: '市场签约5'
      }, {
        value: 24,
        name: '市场签约6'
      }, {
        value: 25,
        name: '市场签约7'
      }]

      //   var rich = {
      //     yellow: {
      //       color: "#3bc7ff",
      //       fontSize: 14,
      //       padding: [8, 0],
      //       align: 'center'
      //     },
      //     total: {
      //       color: "#A2C7F3",
      //       fontSize: 60,
      //       align: 'center'
      //     },
      //     white: {
      //       color: "#a2c7f3",
      //       align: 'center',
      //       fontSize: 18,
      //       padding: [8, 0]
      //     },
      //     blue: {
      //       color: '#3bc7ff',
      //       fontSize: 18,
      //       align: 'center'
      //     },
      //     hr: {
      //       borderColor: '#a2c7f3',
      //       width: '100%',
      //       borderWidth: 1,
      //       height: 0,
      //     }
      //   }

      this.pieDom.setOption({
        // backgroundColor: '#0E1327',
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },

        series: [
          //! 指针层
          {
            name: "内部指针",
            type: "gauge",
            zLevel: 1,
            // center: ['20%', '50%'],
            // radius: '40%',
            splitNumber: 10,
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
            title: { //标题
              show: true,
              offsetCenter: [0, 46], // x, y，单位px
              textStyle: {
                color: "#fff",
                fontSize: 14, //表盘上的标题文字大小
                fontWeight: 400,
                fontFamily: 'PingFangSC'
              }
            },
            data: [{
              name: "选中的人",
              value: 150,
            }],
            //! 指针
            pointer: {
              show: true,
              length: '50%',
              radius: '50%',
              width: 10, //指针粗细
            },
            animationDuration: 4000,
          },
          {
            name: '总考生数量',
            type: 'pie',
            zLevel: 2,
            radius: ['42%', '50%'],
            hoverAnimation: false,
            color: ['#fc962c', '#d83472', '#0F9AF8', '#2B63D5', '#2039C3', '#2ECACE', '#6F81DA'],

            labelLine: {
              normal: {
                length: 20,
                length2: 0,
                lineStyle: {
                  color: '#a2c7f3'
                }
              }
            },
            data: echartData
          }
          // {
          //   name: '外部刻度',
          //   type: 'gauge',
          //   //  center: ['20%', '50%'],
          //   radius: '50%',
          //   min: 0, //最小刻度
          //   max: 100, //最大刻度
          //   splitNumber: 10, //刻度数量
          //   startAngle: 0,
          //   endAngle: 359,
          //   axisLine: {
          //     show: true,
          //     lineStyle: {
          //       width: 1,
          //       color: [
          //         [1, 'rgba(0,0,0,0)']
          //       ]
          //     }
          //   }, //仪表盘轴线
          //   axisLabel: {
          //     show: true,
          //     color: '#4d5bd1',
          //     distance: 25,
          //     formatter: function (v) {
          //       switch (v + '') {
          //         case '0':
          //           return '0';
          //         case '10':
          //           return '10';
          //         case '20':
          //           return '20';
          //         case '30':
          //           return '30';
          //         case '40':
          //           return '40';
          //         case '50':
          //           return '50';
          //         case '60':
          //           return '60';
          //         case '70':
          //           return '70';
          //         case '80':
          //           return '80';
          //         case '90':
          //           return '90';
          //         case '100':
          //           return '100';
          //       }
          //     }
          //   }, //刻度标签。
          //   axisTick: {
          //     show: true,
          //     splitNumber: 7,
          //     lineStyle: {
          //       color: '#468EFD', //用颜色渐变函数不起作用
          //       width: 1,
          //     },
          //     length: -8
          //   }, //刻度样式
          //   splitLine: {
          //     show: true,
          //     length: -20,
          //     lineStyle: {
          //       color: '#468EFD', //用颜色渐变函数不起作用
          //     }
          //   }, //分隔线样式
          //   detail: {
          //     show: false
          //   },
          //   pointer: {
          //     show: false
          //   }
          // },
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