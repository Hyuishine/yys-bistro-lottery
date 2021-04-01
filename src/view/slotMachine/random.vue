<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-31 11:13:37
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-01 14:47:54
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <!-- 奖池容器，转动时 转动这个容器即可 -->
  <div class="jackport_container"
       :style="'transform:rotateX('+ currentDeg + 'deg);'">
    <!-- 奖池，通过旋转形成滚筒 -->
    <div class="award"
         v-for="(name, index) in jackport"
         :key="index"
         :style="`transform: rotateX(${(awardRotate) * index}deg) translateZ(${awardTranslateZ}px)`">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'slotMachine',
  data () {
    return {
      jackport: Array.from(new Array(15), (val, index) => { return index }),
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
.jackport_container {
  * {
    box-sizing: border-box;
  }
  perspective: 999999px;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 200px;
  transform-style: preserve-3d;
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
</style>
