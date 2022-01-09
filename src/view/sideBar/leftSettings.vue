<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 14:36:24
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2022-01-09 22:10:31
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 左侧快捷抽屉，用于中间 当前显示的模块 的 大致设置
-->
<template>
  <div id="sideBar_settings"
       :class="{statusFold:status}">

    <v-card class="content">

    </v-card>
    <!-- 折叠按钮 -->
    <v-btn class="btn_fold"
           color="primary"
           @click="status = !status">
      <v-icon>{{ status ?  'mdi-arrow-right' :'mdi-arrow-left' }}</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'sideBar_settings',
  data: () => ({
    status: true, // 是否显示
  })
}
</script>
<style lang="scss" scoped>
.statusFold {
  transform: translateX(-100%);
}
#sideBar_settings {
  top: 10%;
  height: 80%;
  width: 40%;
  min-width: 550px;
  position: fixed;
  transition: 0.2s ease-in-out;
  // $zIndex-overLay
  z-index: 90;
  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .btn_fold {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(100%, 50%);
  }
}
</style>