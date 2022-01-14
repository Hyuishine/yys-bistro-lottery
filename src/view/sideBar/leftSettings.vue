<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 14:36:24
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-14 22:43:23
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 左侧快捷抽屉，用于中间 当前显示的模块 的 大致设置
-->
<template>
  <div id="sideBar_settings"
       :class="{statusFold:status}">

    <v-card>
      <v-toolbar flat
                 color="primary"
                 dark>
        <v-toolbar-title>抽奖设置</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <!-- tab页签 -->
        <v-tab v-for="(tab,i) in tabContent"
               :key="i">
          <v-icon left>{{ tab.icon }}</v-icon>
          {{ tab.name }}
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <normal-settings></normal-settings>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
              </p>

              <p>
                Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
              </p>

              <p>
                Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
              </p>

              <p>
                Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
              </p>

              <p class="mb-0">
                Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>

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
import normalSettings from './leftModule/normal.vue'


export default {
  name: 'sideBar_settings',
  components: { normalSettings },

  data: () => ({
    status: true, // 是否显示 
    tabContent: [ // tab页签
      { name: '常规设置', icon: 'mdi-cog-outline' },
      { name: '抽奖资格设置', icon: 'mdi-emoticon-kiss-outline' },
      { name: '奖池设置', icon: 'mdi-gift-open-outline' },
    ]
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