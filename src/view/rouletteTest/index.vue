<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-25 17:11:38
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-26 15:39:14
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
底边 = 顶角 * 4

能容纳多少个三角形 : 360 / ( 单个三角形顶角 + 间隔角度)
旋转角度：(顶角 + 间隔角度) * index

底角计算公式：底角=atan(高/(底边/2))。    Math.atan(高/(底边/2))
顶角计算公式：顶角=90度-底角=2*atan((底边/2)/高)。 90 - 2 * Math.atan(高/(底边/2))
-->
<template>
  <v-card class="rouletteContainer"
          color="primary">
    <div class="weel_out">
      <div class="weel_in"> </div>
    </div>
    <span v-for="i in 360"
          :key="i"
          :style="'transform:rotate('+ i * (360 / items) + 'deg);--borderWdith:'+ (360 / items) * 2 +'px;'"></span>
  </v-card>
</template>
<script>
export default {
  name: 'components_randomWeel',
  data () {
    return {
      // 等腰三角形数量
      items: 10,
      // 高 底 顶角 底角
      triangle_Height: null,
      triangle_Bottom: null,
      triangle_Vertex: null,
      triangle_bottomAngle: null
    }
  },
  methods: {
    randomColor () {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return 'rgba(' + r + ',' + g + ',' + b + ',0.8)'
    }
  }
}
</script>
<style lang="scss" scoped>
.rouletteContainer {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 200px auto;
  .weel_out {
    z-index: 2;
    width: 90%;
    height: 90%;
    background: transparent;
    border: 20px solid pink;
    &,
    .weel_in {
      position: relative;
      border-radius: 50% !important;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    }
    .weel_in {
      width: 30%;
      height: 30%;
      // background: pink;
    }
  }
}
span {
  position: absolute;
  border-radius: 50% !important;
  top: 5%;
  left: 5%;
  z-index: 1;
  width: 90%;
  height: 90%;
  background: transparent;
}
span::before {
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

span:nth-child(2n-1)::before {
  border-top-color: red;
}
span:nth-child(2n)::before {
  border-top-color: black;
}
</style>