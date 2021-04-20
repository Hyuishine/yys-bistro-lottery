<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-25 17:11:38
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-30 16:41:59
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 

//! 需要设置的参数：
    底边：span::before 的 border 
    //! (不知道是巧合还是什么，在高度为225下，顶角的两倍为这个 )
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
  <v-card class="wheel_container">
    <div class="wheel_out">
      <!-- 开始停止按钮 -->
      <v-btn color="primary"
             class="btn_start"
             x-large
             fab
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
            :style="'transform:rotate('+ i * (360 / items.length) + 'deg);--borderWdith:'+ ( 360 /items.length) * 2 +'px;'">
        <!-- 奖池上显示的文字 -->
        <i>{{ item }}</i>
      </span>
    </div>
    <h1>{{ currentSelect }}</h1>
  </v-card>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'components_randomwheel',
  props: {
    // 转盘参数
    options: {
      type: Array,
      default: () => {
        return [
          // 随机方式：随机停止/手动停止；旋转方向：正/逆 时针；是否开启回弹
          // { name: 'mod', status: false },
          // { name: 'direction', status: true },
          // { name: 'reCircle', status: false },
        ]
      }
    }
  },
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

      // 等腰三角形数量/转动数据
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
      // 轮盘参数 
      // 随机方式：随机停止/手动停止；旋转方向：正/逆 时针；是否开启回弹
      wheelOptions: {
        mod: false,
        direction: true,
        reCircle: false
      }
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
        this.scroll_status = true
      } else {
        //! 停止
        // document.getElementById('jackport_container').style.transitionDuration = this.scroll_stop_time / 1000 + 's'
        // this.scroll_stop_stoping = true

        // 停止增加滚动格数
        clearTimeout(this.timer_start)
        this.timer_start = null
        this.scroll_status = false

        // 关闭停止动画 重置状态
        // this.timer_stop = setTimeout(() => {
        //   this.scroll_status = false
        //   this.scroll_stop_stoping = false
        //   clearTimeout(this.timer_stop)
        // }, this.scroll_stop_time)
      }
    },
    // 开始转动
    start () {
      this.timer_start = setInterval(() => {
        this.scroll_Nums++
      }, 50)
    },
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
        temp = this.scroll_Nums * -1
      }
      return this.items[temp]
    }
  },
  watch: {
    // 将收到的轮盘参数存放
    options: {
      handler (n) {
        if (n) {
          n.forEach((data) => {
            this.wheelOptions[data.name] = data.status
          });
        }
      },
      deep: true,
      immediate: true
    }
    // scroll_stop_stoping: {
    //   handler (n) {
    //     if (n) {
    //       document.getElementById('jackport_container').style.transitionDuration = this.scroll_stop_time / 1000 + 's'
    //     } else {
    //       document.getElementById('jackport_container').style.transitionDuration = ''
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // }
  }
}
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>