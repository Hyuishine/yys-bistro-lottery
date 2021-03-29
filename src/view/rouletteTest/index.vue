<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-25 17:11:38
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-29 14:25:20
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
  <v-card class="rouletteContainer"
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
    <div id="wheel_container"
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
.rouletteContainer {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 200px auto;
  // 外圈和内圈
  .wheel_out {
    z-index: 2;
    width: 100%;
    height: 100%;
    background: transparent;
    border: 40px solid white;
    position: relative;
    border-radius: 50% !important;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    // 指针
    &::before {
      content: "";
      margin: 0px calc(50% - 15px);
      display: block;
      width: 0px;
      border: 15px solid transparent;
      border-top-style: solid;
      border-top-width: 40px;
      position: absolute;
      background: transparent;
      border-top-color: white;
    }
  }
}

#wheel_container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // 随机项
  span {
    position: absolute;
    border-radius: 50% !important;
    top: 5%;
    left: 5%;
    z-index: 1;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    overflow: hidden;
    background: transparent;
    &::before {
      content: "";
      display: block;
      width: 0px;
      //! 乘以2 是底边长
      border: var(--borderWdith) solid transparent;
      //! 三角形高
      border-top-width: 225px;
      border-top-style: solid;
      position: absolute;
      background: transparent;
      left: calc(50% - var(--borderWdith));
    }
    &:nth-child(2n-1)::before {
      border-top-color: red;
    }
    &:nth-child(2n)::before {
      border-top-color: black;
    }
    // 文字
    i {
      display: block;
      font-style: normal;
      font-weight: bold;
      color: white;
      position: absolute;
      left: calc(50% - 4px);
      top: 12%;
      width: 14px;
      font-size: 10px;
    }
  }
}
.btn_start {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
</style>