<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 18:11:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-14 21:51:50
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 可参与抽奖的人员数据表(剩余没中奖人员)
-->
<template>
  <v-data-table :headers="headers"
                :items="listData"
                no-results-text="没有搜索到，是否需要新增？"
                no-data-text="没有数据，请导入或新增。"
                :footer-props="{
                    'items-per-page-text':'每页多少行',
                    'items-per-page-all-text':'所有'}"
                show-expand
                :expanded.sync="expanded"
                item-key="peopleID"
                :search="search">
    <template v-slot:top>
      <v-toolbar flat>
        <!-- 搜索 -->
        <v-text-field v-model="search"
                      append-icon="mdi-magnify"
                      label="搜索"
                      single-line
                      hide-details></v-text-field>

        <v-spacer></v-spacer>

        <!-- 删除提示框 -->
        <v-dialog v-model="dialogDelete"
                  max-width="500px">
          <v-card>
            <v-card-title class="text-h5">确认删除？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"
                     text
                     @click="closeDelete">取消</v-btn>
              <v-btn color="primary"
                     dark
                     @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- 详情下拉框 -->
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <p>备注： {{ item.peopleRemark ? item.peopleRemark : '暂无' }} </p>
      </td>
    </template>

    <!-- 操作列 -->
    <template v-slot:item.actions="{ item }">
      <v-icon small
              @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>

export default {
  data: () => ({
    search: '', // 搜索条件
    dialog: false, // 新增/修改 弹窗是否显示状态
    dialogDelete: false, // 删除弹窗的状态
    expanded: [], // 展开的详情
    headers: [ //! 表格 列头数据 及表单项数据
      /*
        text:列名，表单label
        align:对齐方式
        vlaue:绑定的值，需要与表单绑定的 键对应
        sortable:允许排序？
        filterable:允许被搜索？
        // formItem:允许被编辑新增？
      */
      { text: '称呼', align: 'start', value: 'name', },
      { text: '联系方式', value: 'howContact' },
      { text: '中奖错过次数', value: 'missTime' },
      { text: '备注', value: 'peopleRemark' },
      { text: '人员id', value: 'peopleID', sortable: false },
      { text: '操作', value: 'actions', sortable: false },
    ],

    deleteIndex: -1, // 当前编辑的行
    defaultItem: { // 新增时的 默认值
      giftAmount: 1
    },
  }),

  computed: {
    formTitle () { // 新增/编辑 弹窗的标题
      return this.deleteIndex === -1 ? '新增' : '编辑'
    },
    listData () {  // 列表数据
      return this.$store.state.module.using.canRandom
    }
  },

  watch: {
    dialog (val) { // false 时关闭新增/编辑表单
      val || this.close()
    },
    dialogDelete (val) { // false 时关闭 删除提示弹窗
      val || this.closeDelete()
    },
  },

  methods: {

    // 新增、编辑取消，重置编辑表单
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.deleteIndex = -1
      })
    },

    // 删除
    deleteItem (row) {
      this.deleteIndex = this.listData.indexOf(row)
      this.dialogDelete = true
    },

    // 确定删除，将当前编辑的行index给删掉
    deleteItemConfirm () {
      this.listData.splice(this.deleteIndex, 1)
      this.closeDelete()
    },

    // 取消删除 重置编辑表单
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.deleteIndex = -1
      })
    },

    // 新增/编辑   保存，如果有正在编辑的index，则是编辑，否则是新增
    save () {
    }
  }
}
</script>