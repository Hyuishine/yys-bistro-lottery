<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-04-01 16:55:19
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-22 21:34:44
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card>
    <!--//! 表头操作按钮 -->
    <tab-header></tab-header>

    <v-tabs v-model="currentTab"
            center-active
            color="primary"
            light>
      <!-- 更改奖池名称 tab栏名称 -->
      <v-dialog max-width="600"
                v-model="dialog_jackportName">
        <v-card>
          <v-toolbar color="primary"
                     dark>更改奖池名称</v-toolbar>
          <v-text-field v-model="jackportName"
                        style="padding:20px;"
                        label="在此输入奖池名称"></v-text-field>
        </v-card>
      </v-dialog>

      <!--//! tab栏 有多少个sheet 创多少个，双击修改tab名 -->
      <v-tab dense
             v-for="(name,i) in tabName"
             :key="i"
             @dblclick="dialog_jackportName = true"> {{ name }}
      </v-tab>

      <!-- tab页 -->
      <v-tab-item v-for="(sheet,i) in sheetData"
                  :key="i">
        <v-card flat>
          <!-- 数据列表 -->
          <v-data-table :headers="sheet.headers"
                        :items="sheet.data">
            <!-- 表头插槽 -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialogDelete"
                          max-width="500px">
                  <v-card>
                    <v-card-title class="headline">是否删除</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1"
                             text>取消</v-btn>
                      <v-btn color="blue darken-1"
                             text>确定</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-toolbar>
            </template>

            <!-- //! 列表操作栏 -->
            <!-- 插槽具名写法 对应列名中 value 为 actions 的列 在该列下显示 -->
            <template v-slot:item.actions="{ item }">
              <v-icon small
                      class="mr-2"
                      @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small
                      @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>

            <!--//! 无数据 -->
            <template v-slot:no-data>
              <h1>暂无数据。请导入，或手动新增</h1>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>
<script>
import tabHeader from './tabHeader.vue';

export default {
  components: { tabHeader },
  data: () => ({
    sheetData: [
      {
        headers: [
          { text: '奖品名称', value: '奖品名称' },
          { text: '数量', value: '数量' },
          { text: '赞助人', value: '赞助人' },
          { text: '单个价值', value: '单个价值' }
        ],
        data: [],
        columnName: ['奖品名称', '数量', '赞助人', '单个价值'],
        editItem: { '奖品名称': '', '数量': '', '赞助人': '', '单个价值': '' }
      }
    ],
    // 表格名
    tabName: ['暂无数据'],

    currentTab: null,
    editIndex: null,// 当前编辑的行
    defaultData: [
      {
        headers: [
          { text: '奖品名称', value: '奖品名称' },
          { text: '数量', value: '数量' },
          { text: '赞助人', value: '赞助人' },
          { text: '单个价值', value: '单个价值' }
        ],
        data: [],
        columnName: ['奖品名称', '数量', '赞助人', '单个价值'],
        editItem: { '奖品名称': '', '数量': '', '赞助人': '', '单个价值': '' }
      }
    ],
    formTitle: '新增奖品',
    jackportName: '',
    // 奖池名称修改弹出框
    dialog_jackportName: false,
    dialog: false,
    dialogDelete: false,

    desserts: [],

    editedItem: {

    },
    defaultItem: {

    },
  })
}
</script>
