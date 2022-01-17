<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-17 21:12:28
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-17 21:39:09
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-row>
    <v-col cols="6"
           span="20"
           v-for="part,i in partData"
           :key="i">
      <v-card hover
              @click="toTarget(part.path)">
        <v-card-title class="text-h4 font-weight-bold">{{ part.title }}</v-card-title>
        <v-card-text>{{ part.info }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'page_random',
  data: () => ({
    partData: [
      { title: '转盘', info: '幸运大转盘', path: '/randomWheel' },
      { title: '滚筒', info: '滚筒老虎机' },
      { title: '格子', info: '格子老虎机' },
      { title: '翻卡', info: '尝试做的类似于“秘境召唤”的抽卡' },
    ]
  }),
  methods: {
    // 去往目标页面
    toTarget (path) {
      path && this.$router.push({
        path: path
      })
    }
  }
}
</script>