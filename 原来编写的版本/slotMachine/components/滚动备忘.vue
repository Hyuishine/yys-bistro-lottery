<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-31 11:13:37
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-15 21:23:00
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
      jackport: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      currentDeg: 0,
      startStatus: false,
    }
  },
  computed: {
    awardRotate () {
      return Math.round(360 / this.jackport.length)
    },
    awardTranslateZ () {
      // (高 / 2) / tan( (360 / 数量 / 2 / 180) * PI )
      return Math.round((200 / 2) / Math.tan((this.awardRotate / 2 / 180) * Math.PI))
    }
  },
  watch: {
    startStatus (n) {
      if (n) {
        this.currentDeg += 23
      }
    }
  }
}
</script>

<style lang="scss">
@import "../styles/random.scss";
</style>
