<template>
  <v-card class="randomContainer">
    <!-- 三个滚筒 -->
    <v-row align="center"
           no-gutters
           justify="center">
      <v-col class="awardWindow"
             v-for="item in 3"
             :key="item">
        <div class="slectBox"></div>
        <random></random>
      </v-col>
    </v-row>
    <!-- 开始随机前的设置 -->
    <start-control @startControl_change="startControl_change"></start-control>
  </v-card>
</template>
<script>
import random from './random.vue'
import StartControl from '../../components/startControl.vue'

export default {
  name: 'slotMachine',
  components: { random, StartControl },
  methods: {
    // 接收随机开始前的设置参数
    startControl_change (curStatus) {
      console.log(curStatus)
    }
  }

}
</script>
<style lang="scss" scoped>
.randomContainer {
  padding: 20px 40px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    transform: translate(-50%, 0);
    top: 50%;
    z-index: 2;
  }
  // 两侧指针
  &::before {
    border: 15px solid transparent;
    border-left-style: solid;
    border-left-width: 40px;
    border-left-color: yellow;
    left: 60px;
  }
  &::after {
    right: 0px;
    border: 15px solid transparent;
    border-right-style: solid;
    border-right-width: 40px;
    border-right-color: yellow;
  }
  // 滚筒上的边框
  .awardWindow {
    margin: 20px;
    border-radius: 5px;
    border: #e9a368 solid 5px;
    box-sizing: border-box;
    position: relative;
  }
  // 当前选中行的边框
  .slectBox {
    border-radius: 5px;
    position: absolute;
    height: 240px;
    width: calc(100% + 40px);
    border: red solid 10px;
    z-index: 1;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
}
</style>