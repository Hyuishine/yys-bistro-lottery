<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-25 17:11:38
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-15 19:45:00
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 

//! 需要设置的参数：
    底边：span::before 的 border 
    高： border-top-width: 已知，为轮盘半径

//! 需要的变量：
    底边：span::before 的 border * 2

//! 已知变量：
    高、三角形数量

三角形数量 = 360 / (90 - 2 * Math.atan( 高 / (底边 / 2) )  + 间隔 )

顶角 = 360 / 三角形数量  
间隔 = （360 % 三角形数量）/ （三角形数量）
底角 = (180 - 顶角) / 2
底边 = 顶角 * 4(因该是巧合)

能容纳多少个三角形 : 360 / ( 单个三角形顶角 + 间隔角度)
每格旋转角度：i * (360 / 顶角)
轮盘每次滚动角度：360 / 顶角

底角计算公式：底角=atan(高/(底边/2))。    Math.atan(高/(底边/2))
顶角计算公式：顶角=90度-底角=2*atan((底边/2)/高)。 90 - 2 * Math.atan(高/(底边/2))
-->
<template>
  <div class="wheel_container">
    <div class="wheel_out">
      <!-- 开始停止按钮 -->
      <v-btn color="pink lighten-3"
             class="btn_start"
             x-large
             fab
             depressed
             dark
             @click="toogleRandom()">
        {{ scroll_status ? '停止' : '开始' }}
      </v-btn>
    </div>
    <!-- 奖池外框 + 指针 -->
    <div id="jackport_container"
         :style="'transform:rotate(' + scroll_Nums * (360 / items.length) + 'deg);'">
      <!-- 奖池 -->
      <span v-for="(item, i) in items"
            :key="i"
            :style="'transform:rotate('+ i * (360 / items.length) + 'deg);--borderWdith:'+ ( 360 / items.length) * 2 +'px;'">
        <!-- 奖池上显示的文字 -->
        <i>{{ item }}</i>
      </span>
    </div>
    <v-card class="awardedBar">
      <v-card-title class="text-h2">123</v-card-title>
    </v-card>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'components_randomwheel',
  data () {
    return {
      // 滚动单位数 是否开始滚动了
      scroll_Nums: 0,
      scroll_status: false,

      // 滚动的停止参数：是否开启滚动停止时设置，正在停止中，结束的停止时间
      scroll_stop_toogle: true,
      scroll_stop_stoping: false,
      scroll_stop_time: 10000,

      timer_stop: null,
      timer_start: null,
    }
  },
  methods: {
    shuffle () {
      this.items = _.shuffle(this.items)
    },
    // 开始 停止 切换
    toogleRandom () {
      if (!this.scroll_status) {
        //! 开始
        this.start()
      } else {
        //! 停止
        this.stop()
      }
    },
    // 开始转动
    start () {
      this.scroll_status = true
      // 上发滚动状态，关闭按钮功能
      this.$emit('scrolling_status', true)
      this.timer_start = setInterval(() => {
        this.scroll_Nums--
      }, 50)
    },
    stop () {
      // 停止增加滚动格数
      clearTimeout(this.timer_start)
      this.timer_start = null
      this.scroll_status = false
      // 上发滚动状态，开启按钮功能
      this.$emit('scrolling_status', false)
    }
  },
  computed: {
    // 当前选中
    currentSelect () {
      let temp
      // 如果是余数为零，则是转动了  一圈的整数倍
      if ((this.scroll_Nums % this.items.length) === 0) {
        temp = 0
      } else if (this.scroll_Nums > 0) {
        // 如果顺时针转动了非一圈的整数倍，则 奖池的长度 - 余数，
        // 因为是顺时针旋转，1的后面是10，所以需要取反数组，然后转的格数 和数组长度是从1开始算的，而 index值是从0 开始算的，
        // 所以公式：转动的格数 % 一圈的格数 - 1格(计算差——长度和index的计算差)  = 反数组的index值
        // arr.reverse()[scroll_Nums % length - 1] = 长度 - 转动的格数(余掉圈格数) 
        // 长度 - 转动的格数 相当于对数组取了一次反，10(长度) - 2(转动格数) = 8，2(index为1) 和 8(倒数第二格) 是对立的，而且长度 和格数都是从1开始算，没有计算差
        temp = this.items.length - (this.scroll_Nums % this.items.length)
      } else if (this.scroll_Nums < 0) {
        // 逆时针旋转，逆时针下1后面是2，是正数组，且转动一格 加一个index逻辑上正确
        temp = (this.scroll_Nums * -1) % this.items.length
      }
      return this.items[temp]
    },

    // 等腰三角形数量/转动数据
    items () {
      return ['辣椒炒肉', '酸菜鱼', '煲仔饭', '蛋炒饭', '兰州拉面', '河南烩面', '肉丝蛋炒粉', '麻辣香锅', '木桶饭']
    }
  },
}
</script>
<style lang="scss" scoped>
.wheel_container {
  position: relative;
  width: 1000px;
  height: 1000px;

  // 外圈和内圈
  .wheel_out {
    z-index: 2;
    width: 1000px;
    height: 1000px;
    background: transparent;
    border: 50px solid #f48fb1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 50% !important;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    // 指针
    &::before {
      content: "";
      transform: translate(-50%, -50%);
      /* margin: 0px calc(50% - 15px); */
      display: block;
      width: 0px;
      border: 25px solid transparent;
      border-bottom-style: solid;
      border-bottom-width: 70px;
      position: absolute;
      background: transparent;
      border-bottom-color: #f48fb1;
      top: 45%;
      left: 50%;
    }
  }
}

#jackport_container {
  // 用于转一次的变量
  // transition-duration: 10s;

  transition: 0.2s;
  transition-timing-function: ease;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  // 随机项
  span {
    position: absolute;
    border-radius: 50% !important;
    top: 5%;
    left: 5%;
    z-index: 1;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    overflow: hidden;
    background: transparent;

    &::before {
      content: "";
      display: block;
      width: 0px;
      //! 乘以2 是底边长
      border: var(--borderWdith) solid transparent;
      //! 三角形高
      border-top-width: 450px;
      border-top-style: solid;
      position: absolute;
      background: transparent;
      left: calc(50% - var(--borderWdith));
    }

    &:nth-child(2n-1)::before {
      border-top-color: #82b1ff;
    }

    &:nth-child(2n)::before {
      border-top-color: #424242;
    }

    // 文字
    i {
      display: block;
      font-style: normal;
      color: white;
      position: absolute;
      left: calc(50% - 10px);
      top: 12%;
      width: 1em;
      font-size: 20px;
    }
  }
}

.btn_start {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.awardedBar {
  position: absolute;
  transition: 0.5s;
  z-index: 2;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  animation: showAwarded 0.2s forwards;
}
@keyframes showAwarded {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
}
</style>