<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:44:42
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-18 22:51:22
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 布局
-->
<template>
  <!-- 主内容 打开菜单时 缩小 通过绑定侧栏菜单状态 拼接字符串匹配样式-->
  <v-app id="inspire">
    <v-container fluid>
      <v-main>
        <v-flex id="viewBox">
          <v-row align="center"
                 justify="center">
            <!--//! 顶部菜单 -->
            <v-col :lg="8"
                   :md="10"
                   :sm="12"
                   :xs="12">
              <header-bar></header-bar>
            </v-col>

            <!--//! 真的内容，敢于嵌套多层娃 -->
            <v-col :lg="8"
                   :md="10"
                   :sm="12"
                   :xs="12"
                   id="contentBox">
              <router-view></router-view>
            </v-col>
          </v-row>

          <left-settings></left-settings>
          <right-data></right-data>
        </v-flex>
      </v-main>
    </v-container>
  </v-app>
</template>
<script>
import leftSettings from '../sideBar/leftSettings.vue'
import rightData from '../sideBar/rightData.vue'
import headerBar from '../header'

export default {
  name: 'layout',
  components: { headerBar, leftSettings, rightData }
}
</script>
<style lang="scss" scoped>
#contentBox {
  max-height: calc(100vh - 100px);
}
</style>