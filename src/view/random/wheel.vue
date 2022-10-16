<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-03-25 17:11:38
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-10-16 17:50:55
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

    <!-- 奖池外框 + 指针,style是用来控制旋转动画的 -->
    <div id="jackport_container"
         :style="'transform:rotate(' + scroll_Nums * (360 / random_items.length) + 'deg);'">

      <!-- 奖池 单个 -->
      <span v-for="(item, i) in random_items"
            :key="i"
            :style="'transform:rotate('+ i * (360 / random_items.length) + 'deg);--borderWdith:'+ ( 360 / random_items.length) * 4 +'px;'">
        <!-- 奖池上显示的文字 -->
        <i>{{  item.name }}</i>
      </span>
    </div>

    <!--//! 中奖展牌 -->
    <v-card class="awardedBar"
            v-if="status_awarded">
      <v-card-text>
        <!-- 中奖人名字 -->
        <div class="text-h2 text-center font-weight-bold">{{  currentSelect.name }}</div>

        <v-form ref="peoplesForm"
                lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="form.giftName"
                            label="所获奖品名称"></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="form.sponsorName"
                            label="赞助人名称"></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="form.sponsorContact"
                            label="赞助人联系方式"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea v-model="form.giftInfo"
                          type="textarea"
                          label="奖品详情"></v-textarea>
            </v-col>
          </v-row>
        </v-form>

        <!-- 底部操作栏 -->
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary"
                 text
                 @click="status_awarded = !status_awarded">
            取消保存
          </v-btn>

          <v-btn color="primary"
                 dark
                 @click="btn_save()">
            保存中奖数据
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>

  </div>
</template>
<script>
import { logWinner } from "../../utils/public"

export default {
  name: 'components_randomwheel',
  data () {
    return {
      scroll_Nums: 0, // 滚动格数
      scroll_status: false, // 是否正在滚动
      timer_start: null, // 控制滚动频率的定时器
      status_awarded: false, // 是否显示中奖信息
      form: {
        giftName: '', // 所获奖品名称
        sponsorName: '', // 奖品赞助人名称
        sponsorContact: '', // 赞助人联系方式
        giftInfo: '', // 奖品详情
      },
    }
  },
  methods: {

    // 开始 停止 切换
    toogleRandom () {
      if (this.random_items.length !== 0) {
        if (!this.scroll_status) {
          //! 开始
          this.start()
        } else if (this.scroll_status) {
          //! 停止
          this.stop()
        }
      } else {
        alert('当前没有人员数据了，是未新增或导入？还是已经全部抽完？')
      }
    },

    // 开始转动
    start () {
      this.scroll_status = true
      this.timer_start = setInterval(() => {
        this.scroll_Nums++
        // todo 这里可以控制快慢
      }, 10)
    },

    // 停止转动
    stop () {
      // 停止增加滚动格数
      clearTimeout(this.timer_start)
      this.timer_start = null
      this.scroll_status = false

      this.status_awarded = true
    },

    // 手动记录中奖信息
    btn_save () {
      logWinner(this.currentSelect, this.form)
      this.status_awarded = !this.status_awarded
    }

  },
  computed: {
    // 当前选中
    currentSelect () {
      let temp
      // 如果是余数为零，则是转动了  一圈的整数倍
      if ((this.scroll_Nums % this.random_items.length) === 0) {
        temp = 0
      } else if (this.scroll_Nums > 0) {
        // 如果顺时针转动了非一圈的整数倍，则 奖池的长度 - 余数，
        // 因为是顺时针旋转，1的后面是10，所以需要取反数组，然后转的格数 和数组长度是从1开始算的，而 index值是从0 开始算的，
        // 所以公式：转动的格数 % 一圈的格数 - 1格(计算差——长度和index的计算差)  = 反数组的index值
        // arr.reverse()[scroll_Nums % length - 1] = 长度 - 转动的格数(余掉圈格数) 
        // 长度 - 转动的格数 相当于对数组取了一次反，10(长度) - 2(转动格数) = 8，2(index为1) 和 8(倒数第二格) 是对立的，而且长度 和格数都是从1开始算，没有计算差
        temp = this.random_items.length - (this.scroll_Nums % this.random_items.length)
      }
      else if (this.scroll_Nums < 0) {
        // 逆时针旋转，逆时针下1后面是2，是正数组，且转动一格 加一个index逻辑上正确
        temp = (this.scroll_Nums * -1) % this.random_items.length
      }
      return this.random_items[temp]
    },

    // 当前随机项
    random_items () {
      const jackport = this.$store.state.module.curPeoples

      // 选定的人员
      if (jackport.length !== 0) {
        return jackport
      } else {
        return this.$store.state.module.using.filter(people => !people.awarded)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./styles/wheel..scss";
</style>