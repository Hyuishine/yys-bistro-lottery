<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-31 11:13:37
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-31 14:39:18
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-row>
    <v-col class="randomCard"
           :cols="12"
           v-for="(name,index) in 10"
           :key="index"
           :style="`transform: rotateX(${(rotate) * index}deg) translateZ(${translateZ}px`">
      {{ name }}
    </v-col>
  </v-row>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    rotate () {
      return 360 / 10
    },
    translateZ () {
      // (高 / 2) / tan( (360 / 数量 / 2 / 180) * PI )
      return (200 / 2) / Math.tan((this.rotate / 2 / 180) * Math.PI)
    }
  }
}
</script>
<style lang="scss" scoped>
.randomCard {
  height: 200px;
  text-align: center;
  font-size: 40px;
  line-height: 100%;
  border: red solid;
  background: skyblue;

  font-size: 150px;
}
</style>