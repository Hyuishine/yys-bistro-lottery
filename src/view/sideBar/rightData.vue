<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 14:36:24
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2022-01-09 22:11:38
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 右侧 快捷抽屉 用于显示当前已经产生的数据
-->
<template>
  <div id="sideBar_dataShow"
       class="sideBar"
       :class="{statusFold:status}">
    <!-- 折叠按钮 -->
    <v-btn class="btn_fold"
           color="primary"
           @click="status = !status">
      <v-icon>{{ status ? 'mdi-arrow-left' : 'mdi-arrow-right'}}</v-icon>
    </v-btn>

    <v-card class="content">

    </v-card>

  </div>
</template>
<script>
export default {
  name: 'sideBar_dataShow',
  data: () => ({
    status: true, // 是否显示
  })
}
</script>
<style lang="scss" scoped>
.statusFold {
  transform: translateX(100%);
}
#sideBar_dataShow {
  top: 10%;
  height: 80%;
  width: 40%;
  min-width: 550px;
  right: 12px;
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
    left: 0;
    transform: translate(-100%, 50%);
  }
}
</style>