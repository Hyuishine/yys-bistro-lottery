<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-25 17:11:38
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-25 17:41:38
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card class="rouletteContainer"
          color="primary">
    <div class="weel_out">
      <div class="weel_in"> </div>
    </div>
    <span></span>
    <span></span>
    <span></span>
  </v-card>
</template>
<script>
export default {
  data () {
    return {

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
      background: pink;
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
  border: 40px solid transparent;
  border-top-width: 160px;
  border-top-style: solid;
  position: absolute;
  border-top-color: red;
  background: transparent;
  left: calc(50% - 40px);
}
</style>