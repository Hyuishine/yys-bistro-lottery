<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-25 00:08:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-29 16:13:35
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div class="random_card_container">
    <v-card class="random_card_area"
            v-if="list.length > 0">
      <!-- 奖池，高亮显示当前被滚动到的人 -->
      <v-card v-for="(name,index) in list"
              :key="index"
              :style="currentIndex === index ?  'background-color:red;color:white;':''"
              class="random_card_content">
        <v-card-title>{{ name }}</v-card-title>
      </v-card>
      <v-card-actions>
        <v-btn text
               :disabled="randomStatus"
               color="warning"
               @click="shuffle()">
          打乱数据
        </v-btn>
        <v-btn text
               :disabled="randomStatus"
               @click="list = []"
               color="error">
          清空数据
        </v-btn>
        <v-btn text
               :disabled="tootleStatus"
               @click="toogleRandom()"
               color="primary">
          {{ randomStatus ? '停止' : '开始' }}
        </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text
                   color="primary"
                   v-bind="attrs"
                   v-on="on">
              使用说明
            </v-btn>
          </template>
          <span>点击开始。红点开始滚动，停止按钮将会随机禁用0~5秒。<br>
            点击停止，红点将会随机在0~30秒内停止滚动 </span>
        </v-tooltip>
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
      // 开始停止按钮的 可使用状态
      tootleStatus: false,
      list: [],
      // 抽中的编号
      lucky: 0,
      randomData: [],
      //! true为开启 按钮则显示停止，false为停止状态，按钮则显示开始
      randomStatus: false,
      speed: 500,
      // 单位毫秒，速度到多少毫秒一格之后停止
      speedToStop: 1000,
      // 开始 结束 加速 减速 定时器
      timer_start: null,
      timer_stop: null,
      // 当前中奖编号
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
    },
    toogleRandom () {
      if (!this.randomStatus) {
        //! 开始
        this.start()
        this.randomStatus = true
        this.tootleStatus = true
        //随机出放开停止按钮  0 - 5秒
        var disabledTime = Math.round(Math.random() * 5000)
        // 随机出停止速度到多少毫秒滚动一格时 停止 最大30秒（100 + 200 序列加到2500）
        this.speedToStop = Math.round(Math.random() * 2500)
        var tootleStatus_timer = setTimeout(() => {
          this.tootleStatus = false
          clearTimeout(tootleStatus_timer)
        }, disabledTime)

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
      this.currentIndex >= this.list.length ? (this.currentIndex = 0) : this.currentIndex++

      this.timer_start = setTimeout(() => {
        this.start()
      }, this.speed)
    },
    stop () {
      //! 如果速度到最小速度了  不再减速
      if (this.speed < this.speedToStop) {
        this.speed += 100
      } else {
        clearTimeout(this.timer_stop)
        this.timer_stop = null
        this.speed = 500
        //! 防止停止时刚好不在范围内
        if (this.currentIndex >= this.list.length) {
          this.currentIndex = 0
        }
        return
      }

      //! 如果滚动的数 到了最大值 置为0
      this.currentIndex >= this.list.length ? (this.currentIndex = 0) : this.currentIndex++

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
      transition: 0.5s ease-in-out all;
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