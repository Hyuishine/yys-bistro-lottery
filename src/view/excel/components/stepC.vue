<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-25 00:08:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-25 00:47:48
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div class="random_card_container">
    <v-card class="random_card_area"
            v-if="list.length > 0">
      <v-card v-for="(name,index) in list"
              :key="index"
              :style="currentIndex === index ?  'background-color:red;':''"
              class="random_card_content">
        <v-card-title>{{ name }}</v-card-title>
      </v-card>
      <p class="test_result">{{ '当前选中'+ currentIndex }}</p>
      <p class="test_result">{{ '当前速度'+ speed }}</p>
      <v-card-actions>
        <v-btn text
               color="warning"
               @click="shuffle()">
          打乱数据
        </v-btn>
        <v-btn text
               @click="list = []"
               color="error">
          清空数据
        </v-btn>
        <v-btn text
               @click="startRandom()"
               color="primary">
          {{ randomStatus ? '停止' : '开始' }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <h1 v-else>暂无数据</h1>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'random',
  cname: '抽奖',
  data () {
    return {
      list: [],
      // 抽中的编号
      lucky: 0,
      randomData: [],
      //! true为开启 按钮则显示停止，false为停止状态，按钮则显示开始
      randomStatus: false,
      speed: 500,

      // 开始 结束 加速 减速 定时器
      timer_start: null,
      timer_stop: null,
      // !测试数据
      currentIndex: 0
    }
  },
  created () {
    try {
      var temp = this.$store.state.module.sheetData
      temp[0].forEach(element => {
        this.list.push(element.Name)
      });
    } catch (error) {
      return
    }

  },
  methods: {
    shuffle: function () {
      this.list = _.shuffle(this.list)
      console.log(this.list)
    },
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
      this.speed > 1 ? (this.speed -= 50) : (this.speed = 1)
      //! 如果滚动的数 到了最大值 置为0
      this.currentIndex > this.list.length ? (this.currentIndex = 0) : this.currentIndex++

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
      this.currentIndex > this.list.length ? (this.currentIndex = 0) : this.currentIndex++

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
      transition: 0.5s all;
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