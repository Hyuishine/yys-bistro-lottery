<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-25 17:11:38
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-29 15:33:31
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 

//! 需要设置的参数：
    底边：span::before 的 border 
    //! (不知道是巧合还是什么，在高度为225下，顶角的两倍为这个 )
    高： border-top-width: 已知，为轮盘半径

//! 需要的变量：
    底边：span::before 的 border * 2

//! 已知变量：
    高、三角形数量

三角形数量 = 360 / (90 - 2 * Math.atan( 高 / (底边 / 2) )  + 间隔 )

顶角 = 360 / 三角形数量  
间隔 = （360 % 三角形数量）/ （三角形数量）
底角 = (180 - 顶角) / 2
底边 = 顶角 * 4(因该是巧合)

能容纳多少个三角形 : 360 / ( 单个三角形顶角 + 间隔角度)
每格旋转角度：i * (360 / 顶角)
轮盘每次滚动角度：360 / 顶角

底角计算公式：底角=atan(高/(底边/2))。    Math.atan(高/(底边/2))
顶角计算公式：顶角=90度-底角=2*atan((底边/2)/高)。 90 - 2 * Math.atan(高/(底边/2))
-->
<template>
  <v-card class="wheel_container"
          color="primary">
    <div class="wheel_out">
      <v-btn color="primary"
             class="btn_start"
             x-large
             fab
             @click="start()">
        开始
      </v-btn>
    </div>
    <!-- 奖池外框 + 指针 -->
    <div id="jackport_container"
         :style="'transform:rotate(' + scrollNums * (360 / items.length) + 'deg)'">
      <!-- 奖池 -->
      <span v-for="(item, i) in items"
            :key="i"
            :style="'transform:rotate('+ (i - 1) * (360 / items.length) + 'deg);--borderWdith:'+ ( 360 /items.length) * 2 +'px;'">
        <!-- 奖池上显示的文字 -->
        <i>{{ item }}</i>
      </span>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'components_randomwheel',
  data () {
    return {
      // 滚动单位数
      scrollNums: 0,
      // 等腰三角形数量
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    }
  },
  methods: {
    start () {
    },
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>