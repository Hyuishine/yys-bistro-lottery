<template>
  <div>
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
    </v-card>
    <!-- 开始随机前的设置 -->
    <start-control @startControl_change="startControl_change"
                   @startStatus_change="startStatus_change"
                   :status="start_status"></start-control>
  </div>
</template>
<script>
import random from './components/random.vue'
import StartControl from '../../components/startControl.vue'

export default {
  name: 'slotMachine',
  components: { random, StartControl },
  data () {
    return {
      start_status: false
    }
  },
  methods: {
    // 接收随机开始前的设置参数
    startControl_change (curStatus) {
      console.log(curStatus)
    },
    // 接收开始按钮的状态
    startStatus_change (curStatus) {
      this.start_status = curStatus
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./styles/index.scss";
</style>