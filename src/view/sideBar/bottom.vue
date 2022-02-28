<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 14:36:24
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-02-28 15:24:44
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 左侧快捷抽屉，用于中间 当前显示的模块 的 大致设置
-->
<template>
  <v-card id="sideBar_bottom"
          :class="{statusFold:status}">

    <!-- 标题 -->
    <v-toolbar flat
               color="primary"
               dark>
      <v-toolbar-title>数据展示</v-toolbar-title>
    </v-toolbar>

    <v-tabs v-model="activeTab"
            icons-and-text
            dark
            dense
            background-color="primary">
      <!-- tab页签 -->
      <v-tab v-for="(tab,i) in tabData"
             :key="i">
        {{ tab.name }}
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>

    <!-- tab页内容 -->
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="(tabContent,i) in tabData"
                  :key="i"
                  :value="i">
        <components :is="tabContent.module" />
      </v-tab-item>
    </v-tabs-items>

    <!-- 折叠按钮 -->
    <v-btn class="btn_fold"
           color="primary"
           @click="status = !status">
      <v-icon>{{ status ?  'mdi-arrow-up' :'mdi-arrow-down' }}</v-icon>
    </v-btn>
  </v-card>
</template>
<script>
import peoples from '../dataEditor/peoples.vue'
import awarded from '../dataEditor/awarded.vue'

export default {
  name: 'sideBar_bottom',
  data: () => ({
    status: true, // 是否折叠
    activeTab: null,
    tabData: [
      { name: '人员', icon: 'mdi-emoticon-cool-outline', module: peoples },
      { name: '获奖数据', icon: 'mdi-party-popper', module: awarded }
    ]
  })
}
</script>
<style lang="scss" scoped>
.statusFold {
  transform: translateY(100%);
}
#sideBar_bottom {
  height: 60%;
  min-height: 600px;
  width: 90%;
  min-width: 550px;
  position: fixed;
  transition: 0.2s ease-in-out;
  z-index: 90;
  bottom: 10px;
  left: 5%;

  // $zIndex-overLay
  z-index: 90;
  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .btn_fold {
    position: absolute;
    top: 0;
    transform: translate(-50%, -100%);
    left: 50%;
  }
}
</style>