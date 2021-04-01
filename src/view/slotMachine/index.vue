<template>
  <v-card class="randomContainer">
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
  </v-card>
</template>
<script>
import random from './random.vue'
export default {
  name: 'slotMachine',
  components: { random },
}
</script>
<style lang="scss" scoped>
.randomContainer {
  &::before,
  &::after {
    content: "";
    position: absolute;
    transform: translate(-50%, 0);
    top: 50%;
    z-index: 2;
  }
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
  padding: 20px 40px;
  .awardWindow {
    margin: 20px;
    border-radius: 5px;
    border: #e9a368 solid 5px;
    box-sizing: border-box;
    position: relative;
  }
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