<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 18:11:30
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2022-01-09 23:23:08
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 人员数据表
-->
<template>
  <v-data-table :headers="headers"
                :items="listData"
                no-results-text="没有搜索到，是否需要新增？"
                no-data-text="没有数据，请导入或新增。"
                :footer-props="{
                    'items-per-page-text':'每页多少行',
                    'items-per-page-all-text':'所有'
                }"
                show-expand
                :expanded.sync="expanded"
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

        <!-- 新增/修改弹窗 -->
        <v-dialog v-model="dialog"
                  max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary"
                   dark
                   v-bind="attrs"
                   v-on="on">
              新增
            </v-btn>
          </template>

          <v-card>
            <!-- 新增/修改  弹窗标题 -->
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <!-- 新增/修改 表单项 ,当列项数据 headers 中的formItem值为flase 时不创建-->
            <v-card-text>
              <v-container>
                <v-row>
                  <template v-for="(item,i) in headers">
                    <v-col cols="12"
                           sm="6"
                           md="4"
                           :key="i"
                           v-if="item.formItem !== false">
                      <v-text-field v-model="editedItem[item.value]"
                                    :label="item.text"></v-text-field>
                    </v-col>
                  </template>
                </v-row>
              </v-container>
            </v-card-text>

            <!-- 新增/修改弹窗 操作按钮 -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"
                     text
                     @click="close">
                取消
              </v-btn>
              <v-btn color="primary"
                     dark
                     @click="save">
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
        <p>奖品备注： {{ item.giftRemark ? item.giftRemark : '暂无' }}</p>
      </td>
    </template>

    <!-- 操作列 -->
    <template v-slot:item.actions="{ item }">
      <v-icon small
              @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small
              @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <!-- 暂无数据 -->
    <template v-slot:no-data>
      <v-btn color="primary">
        导入数据
      </v-btn>
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
        formItem:允许被编辑新增？
      */
      { text: '赞助奖品名称', value: 'giftName' },
      { text: '赞助人称呼', align: 'start', value: 'name', },
      { text: '赞助数量', value: 'giftAmount' },
      { text: '剩余数量', value: 'remaining' },
      { text: '备注/详情', value: 'giftRemark' },
      { text: '赞助人id', value: 'peopleID', sortable: false, formItem: false },
      { text: '操作', value: 'actions', sortable: false, formItem: false },
    ],
    editedIndex: -1, // 当前编辑的行
    editedItem: { // 编辑 表单的绑定项
      name: '',
      howContact: '',
      giftAmount: 1,
      remaining: 1,
      giftName: '',
      giftRemark: '',
    },
    defaultItem: { // 新增时的 默认值
      name: '',
      giftAmount: 1,
      howContact: '',
      remaining: 1,
      giftName: '',
    },
  }),

  computed: {
    formTitle () { // 新增/编辑 弹窗的标题
      return this.editedIndex === -1 ? '新增' : '编辑'
    },
    listData () {  // 列表数据
      return this.$store.state.using.gifts || []
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

    // 编辑，
    /*
        传入行数据
        查找出当前行的index，然后转存到当前正在编辑的表单数据中
        打开弹窗
    */
    editItem (row) {
      this.editedIndex = this.listData.indexOf(row)
      this.editedItem = Object.assign({}, row)
      this.dialog = true
    },

    // 新增、编辑取消，重置编辑表单
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // 删除
    deleteItem (row) {
      this.editedIndex = this.listData.indexOf(row)
      this.editedItem = Object.assign({}, row)
      this.dialogDelete = true
    },

    // 确定删除，将当前编辑的行index给删掉
    deleteItemConfirm () {
      this.listData.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    // 取消删除 重置编辑表单
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // 新增/编辑   保存，如果有正在编辑的index，则是编辑，否则是新增
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.listData[this.editedIndex], this.editedItem)
      } else {

        // todo 需要处理人员id，奖品id
        this.listData.push(this.editedItem)
      }
      this.close()
    },
  }
}
</script>