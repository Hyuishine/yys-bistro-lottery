<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-31 11:13:37
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-01 16:03:48
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <!-- 奖池容器，转动时 转动这个容器即可 -->
  <div class="random_slotMachine">
    <div class="jackport_container"
         :style="'transform:rotateX('+ currentDeg + 'deg);'">
      <!-- 奖池，通过旋转形成滚筒 -->
      <div class="award"
           v-for="(name, i) in jackport"
           :key="i"
           :style="`transform: rotateX(${(awardRotate) * i}deg) translateZ(${awardTranslateZ}px)`">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'random_slotMachine',
  data () {
    return {
      jackport: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      currentDeg: 0,
    }
  },
  computed: {
    awardRotate () {
      return 360 / this.jackport.length
    },
    awardTranslateZ () {
      // (高 / 2) / tan( (360 / 数量 / 2 / 180) * PI )
      return (200 / 2) / Math.tan((this.awardRotate / 2 / 180) * Math.PI)
    }
  },
}
</script>

<style lang="scss">
.random_slotMachine {
  width: 100%;
  height: 600px;
  overflow: hidden;
  padding: 200px 0;
  // 上下两端 渐变 模拟立体
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 80px;
    z-index: 1;
  }
  &::before {
    top: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  }
  &::after {
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1)
    );
  }
  .jackport_container {
    transform-style: preserve-3d;

    * {
      box-sizing: border-box;
    }
    .award {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 200px;
      border: 1px solid #333;
      background-color: #fff;
      font-size: 150px;
    }
  }
}
</style>
