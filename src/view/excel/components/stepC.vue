<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-25 00:08:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 13:27:03
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text
                   :disabled="tootleStatus"
                   @click="toogleRandom()"
                   color="primary"
                   v-bind="attrs"
                   v-on="on">
              {{ randomStatus ? '停止' : '开始' }}
            </v-btn>
          </template>
          <span>{{ randomStatus ? 
            (tootleStatus ? '开启之后10秒钟会放开停止按钮':'点击停止滚动') 
            : '点击开始。红点开始滚动，开始按钮将会禁用，十秒钟之后才可以手动停止' }}</span>
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
      // console.log(this.list)
    },
    toogleRandom () {
      if (!this.randomStatus) {
        //! 开始
        this.start()
        this.randomStatus = true
        this.tootleStatus = true
        var tootleStatus_timer = setTimeout(() => {
          this.tootleStatus = false
          clearTimeout(tootleStatus_timer)
        }, 10000)
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
      this.speed > 1 ? (this.speed -= 200) : (this.speed = 1)
      //! 如果滚动的数 到了最大值 置为0
      this.currentIndex >= this.list.length ? (this.currentIndex = 0) : this.currentIndex++

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
        this.speed = 500
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