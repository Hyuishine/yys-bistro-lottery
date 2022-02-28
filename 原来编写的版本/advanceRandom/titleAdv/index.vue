<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 11:24:24
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 17:26:30
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card hover>
    <transition enter-active-class="animate__slideInUp">
      <v-card-title>
        {{ txt_title }}
        <v-btn color="primary"
               text>
          导入数据
        </v-btn>
      </v-card-title>
    </transition>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      txt_title: '赞助广告滚动栏'
    }
  }
}
</script>