<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 23:33:28
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-10 00:10:47
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div id="dailyAnalysis_echart_change"></div>
</template>
<script>
import echarts from "echarts";
export default {
  mounted () {
    this.drawEchart()
  },
  methods: {
    drawEchart () {
      this.pieEchart = echarts.init(
        document.getElementById('dailyAnalysis_echart_change')
      )
      this.pieEchart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} 人 <br/>所占比例 : ({d}%)'
        },
        color: ['#f73367', '#3cec44', '#fc9648', '#00fcff', '#c755f7'],
        // color: ['#f73367', '#66ee6c', '#fd9b51', '#2c77ed'], // 饼图内容颜色
        // color: ['#ef6742', '#ed8f15', '#001eff', '#354dff', '#566aff', '#9b5af3', '#c396ff', '#fff'], // 饼图内容颜色
        legend: { // 标注 颜色标注
          // right: '30%',
          left: '70%',
          top: '15%',
          itemGap: 10,
          itemWidth: 16,
          itemHeight: 8,
          textStyle: {
            color: '#fff',
            lineHeight: 12,
            fontSize: 12,
            fontWeight: 400,
            // padding: [0, 0, 0, 10]
          }
        },
        series: [
          {
            name: '问题线索来源分布',
            type: 'pie', // 图类型
            // radius: ['20%', '30%'],
            center: ['30%', '50%'],

            data: [{
              name: "谈话函询",
              value: "153"
            }, {
              name: "初步核实",
              value: "241"
            }, {
              name: "函询 + 核实",
              value: "196"
            }, {
              name: "暂存待查",
              value: "220"
            }, {
              name: "予以了结",
              value: "320"
            }],
            roseType: 'radius', // 玫瑰图形
            radius: '65%',// 饼图大小/比例
            labelLine: { // 指示线样式
              smooth: 0.2, // 平滑度
              length: 5, // 线长
              length2: 8 // 拐线长
            },
            label: {
              fontSize: 14,
              color: '#fff',
              fontWeight: 400,
              // formatter: '{b}{d}%' //区域名字和百分比
              // a:标题、b：区块名、c：数量、d：百分比
              formatter: '{d}%'
            },
          }
        ]
      }, true)
      // 窗口自适应
      window.addEventListener('resize', () => {
        this.pieEchart.resize()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#dailyAnalysis_echart_change {
  height: 500px;
  width: 500px;
  * {
    height: 500px;
  }
  canvas {
    height: 500px;
  }
}
</style>