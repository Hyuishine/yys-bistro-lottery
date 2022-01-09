<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 14:25:48
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2022-01-08 17:20:19
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card hover
          dense
          id="menuHeader">

    <div class="container">
      <!-- 操作按钮 -->
      <div class="btnContainer">
        <!-- 带底部tip -->
        <v-tooltip bottom
                   v-for="(btn,i) in btnData"
                   :key="i">
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab
                   dark
                   depressed
                   small
                   v-bind="attrs"
                   v-on="on"
                   :color="btn.color">
              <!-- 图标 -->
              <v-icon dark>
                {{ btn.icon }}
              </v-icon>
            </v-btn>
          </template>
          <!-- tip -->
          <span>{{ btn.tips }}</span>
        </v-tooltip>

      </div>
      <!-- 标题 -->
      <v-text-field class="title"
                    dense
                    v-model="titleContent"
                    hint="手动输入当前操作内容，方便给观众展示和说明"></v-text-field>
    </div>

  </v-card>
</template>
<script>
export default {
  data: () => ({
    // 标题数据、按钮数据
    titleContent: '欢迎来到 “小酒馆” 五周年',
    btnData: [
      { icon: 'mdi-help', color: 'primary', methodsName: '', tips: '如何使用？' },
      { icon: 'mdi-file-export-outline', color: 'secondary', methodsName: '', tips: '数据导出' },
      { icon: 'mdi-square-edit-outline', color: 'accent', methodsName: '', tips: '编辑数据' },
      { icon: 'mdi-chart-bar', color: 'pink lighten-3', methodsName: '', tips: '展示数据' },
      { icon: 'mdi-check-bold', color: 'success', methodsName: '', tips: '选择抽奖工具' },
    ]
  })
}
</script>
<style lang="scss" scoped>
#menuHeader {
  // $zIndex-menuHeader
  z-index: 92;
  .container {
    display: flex;
    .title {
      font-size: 30px;
      font-weight: bolder;
    }
    .btnContainer {
      & > * {
        margin-right: 10px;
      }
    }
  }
}
</style>