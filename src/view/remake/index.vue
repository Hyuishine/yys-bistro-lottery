<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 08:56:49
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 09:32:28
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-row dense>
    <v-col cols="12">
      <v-card hover>
        <transition enter-active-class="animate__slideInUp">
          <v-card-title>
            {{ txt_title }}
          </v-card-title>
        </transition>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card hover
              class="random">
        <pie-random></pie-random>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card hover
              class="random">
        <h1>奖池</h1>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
// import cardRandom from './components/cardRandom'
import pieRandom from './components/pieRandom'
export default {
  components: {
    // cardRandom, 
    pieRandom
  },
  data () {
    return {
      txt_title: 1
    }
  },
  mounted () {
    setInterval(() => {
      this.txt_title++
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
.random {
  min-height: 500px;
  canvas {
    height: 100%;
  }
}
</style>