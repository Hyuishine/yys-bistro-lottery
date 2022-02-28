<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:44:42
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-02-28 15:26:31
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
          <v-row justify="center">
            <!--//! 顶部菜单 -->
            <v-col :lg="8"
                   :md="10"
                   :sm="12"
                   :xs="12"
                   class="header">
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

          <left></left>
          <bottom></bottom>
        </v-flex>
      </v-main>
    </v-container>
  </v-app>
</template>
<script>
import left from '../sideBar/left.vue'
import bottom from '../sideBar/bottom.vue'

import headerBar from '../header'

export default {
  name: 'layout',
  components: { headerBar, left, bottom }
}
</script>
<style lang="scss" scoped>
#contentBox {
  margin-top: 90px;
  max-height: calc(100vh - 100px);
}
.header {
  position: fixed;
  z-index: 9;
}
</style>