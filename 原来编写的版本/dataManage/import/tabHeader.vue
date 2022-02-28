<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-22 21:01:28
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-22 21:50:52
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card-actions>

    <!-- 顶部操作按钮 -->
    <v-tooltip bottom
               v-for="(btn, i) in btnData"
               :key="i">
      <template v-slot:activator="{ on, attrs }">
        
        <v-btn :disabled="btn.disabled"
               :color="btn.color"
               v-bind="attrs"
               v-on="on"
               style="margin-right:10px;"> {{ btn.label }}
        </v-btn>
        
      </template>

      <!-- 按钮操作提示 -->
      <span>{{ btn.tip }}</span>
    </v-tooltip>

    <!-- 新增列表数据弹出框 -->
    <v-dialog v-model="status_dialog"
              max-width="500px">
      <v-card>
        <!--//! 新增/编辑弹出框 -->
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>

          </v-container>
        </v-card-text>

        <!-- 弹出框操作按钮 -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"
                 text>
            取消
          </v-btn>
          <v-btn color="blue darken-1"
                 text>
            新增
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-actions>

</template>
<script>
export default {
  name: 'import_tabHeader',
  data: () => ({
    btnData: [ // 按钮数据，params：名字、颜色、方法名、是否禁用、操作提示
      { label: '下载模板', color: 'secondary', method: 'downloadFile', disabled: false, tip: '下载excel导入模板' },
      { label: '导入表格', color: 'warning', method: 'importFile', disabled: false, tip: '一键导入' },
      { label: '添加奖池', color: 'success', method: 'add_tab', disabled: false, tip: '下载excel导入模板' },
      { label: '手动新增奖池数据', color: 'primary', method: 'add_istItem', disabled: false, tip: '下载excel导入模板' },
      { label: '清空该奖池', color: 'error', method: 'del_currentTab', disabled: false, tip: '下载excel导入模板' },
    ],
    status_dialog: false, // 新增弹窗框状态
    formTitle: '新增奖品' // 弹出框标题
  }),
  methods: {

  },
}
</script>