<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-10 15:01:37
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-11 22:45:39
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div class="random_card_container">
    <div class="random_card_area">
      <v-card v-for="index in 70"
              :key="index"
              :style="testRandom === index ?  'background-color:red;':''"
              class="random_card_content">
        <v-card-title>{{ index }}</v-card-title>
      </v-card>
    </div>

    <p class="test_result">{{ '当前选中'+ testRandom }}</p>
    <p class="test_result">{{ '当前速度'+ speed }}</p>
    <v-btn rounded
           dark
           @click="startRandom()"
           color="primary"
           class="random_card_btn_start">
      {{ randomStatus ? '停止' : '开始' }}
    </v-btn>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 抽中的编号
      lucky: 0,
      randomData: [],
      //! true为开启 按钮则显示停止，false为停止状态，按钮则显示开始
      randomStatus: false,
      speed: 1000,

      // 开始 结束 加速 减速 定时器
      timer_start: null,
      timer_stop: null,
      // !测试数据
      testRandom: 0
    }
  },
  methods: {
    startRandom () {
      if (!this.randomStatus) {
        //! 开始
        this.start()
        this.randomStatus = true
      } else {
        //! 停止     
        clearTimeout(this.timer_start)
        this.timer_start = null
        this.randomStatus = false
        this.stop()
      }
    },

    start () {
      //! 如果速度到1 最大速度了 不再加速
      this.speed > 1 ? (this.speed -= 100) : (this.speed = 1)
      //! 如果滚动的数 到了最大值 置为0
      this.testRandom > 70 ? (this.testRandom = 0) : this.testRandom++

      this.timer_start = setTimeout(() => {
        this.start()
      }, this.speed)
    },
    stop () {
      //! 如果速度到最小速度了  不再减速
      if (this.speed < 1000) {
        this.speed += 100
      } else {
        clearTimeout(this.timer_stop)
        this.timer_stop = null
        return
      }

      //! 如果滚动的数 到了最大值 置为0
      this.testRandom > 70 ? (this.testRandom = 0) : this.testRandom++


      this.timer_stop = setTimeout(() => {
        this.stop()
      }, this.speed)
    }
  }
}
</script>
<style lang="scss" scoped>
.random_card_container {
  .random_card_area {
    flex-wrap: wrap;
    display: flex;
    .random_card_content {
      // transition: 0.1s all;
      margin: 10px;
    }
  }
  .random_card_btn_start {
    margin: 10px 50%;
  }
  .test_result {
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    line-height: 30px;
  }
}
</style>