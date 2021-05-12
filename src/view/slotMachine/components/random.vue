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
  <!-- 奖池容器 -->
  <div class="random_slotMachine">
    <!-- 滚动时向上滑动这个即可，滑动的像素等于 (滑动的格数 * 单格高度) - 首个偏移量 -->
    <div class="random_scrollPane"
         :style="curStyle">
      <div class="test"
           style="margin-top: -50px;">20</div>
      <div class="test"
           v-for="i in 20"
           :key="i">{{ i }}</div>
      <div class="test"
           style="margin-top: -50px;">1</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'random_slotMachine',
  data () {
    return {
      curMargin: 0
    }
  },
  computed: {
    curStyle () {
      // Math.round(this.curMargin % 4200)
      // 返回一格的偏移量
      let a = 0 - Math.round(this.curMargin / 200) * 200 - 50
      return 'margin-top:' + a + 'px;'
    }
  },
  watch: {
    startStatus () {
      this.curMargin += 23
    }
  }
}
</script>

<style lang="scss">
.random_slotMachine {
  height: 500px;
  overflow: hidden;
}
.random_scrollPane {
  transition: all 1s;
}
.test {
  position: relative;
  text-align: center;
  line-height: 200px;
  border: solid 2px black;
  height: 200px;
  box-sizing: border-box;
}
</style>
