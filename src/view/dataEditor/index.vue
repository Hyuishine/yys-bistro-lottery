<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 14:21:11
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-02-28 15:23:38
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card>
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
  </v-card>
</template>
<script>
import peoples from './peoples'
import awarded from './awarded'

import dataImport from './dataImport/index.vue'

export default {
  data: () => ({
    activeTab: null,
    tabData: [
      { name: '数据导入', icon: 'mdi-file-import-outline', module: dataImport },
      { name: '人员', icon: 'mdi-emoticon-cool-outline', module: peoples },
      { name: '获奖数据', icon: 'mdi-party-popper', module: awarded }
    ]
  })
}
</script>