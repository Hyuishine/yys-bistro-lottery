<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 18:11:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-24 20:42:53
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
                    'items-per-page-all-text':'所有'}"
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
                <v-form ref="peoplesForm"
                        lazy-validation>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="editFormObject.name"
                                    label="称呼"
                                    :counter="20"
                                    required
                                    :rules="formRule.name"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field v-model="editFormObject.howContact"
                                    label="联系方式"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field v-model.number="editFormObject.ID"
                                    label="游戏ID"
                                    :rules="formRule.ID"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field v-model.number="editFormObject.rank"
                                    label="斗技分"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field v-model.number="editFormObject.contribution"
                                    label="勋章数"></v-text-field>
                    </v-col>

                  </v-row>
                </v-form>
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
import { idCreator } from '@/utils/idCreator'

export default {
  data: () => ({
    search: '', // 搜索条件
    dialog: false, // 新增/修改 弹窗是否显示状态
    dialogDelete: false, // 删除弹窗的状态
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
      { text: '游戏ID', value: 'ID' },
      { text: '斗技分', value: 'rank' },
      { text: '勋章数', value: 'contribution' },
      { text: '已中奖', value: 'awarded' },
      { text: '中奖错过次数', value: 'missTime' },
      { text: '操作', value: 'actions', sortable: false },
    ],
    formRule: {
      name: [v => !!v || '称呼必填'],
      ID: [v => Number(v) || '游戏ID必填，且须是数字']
    },

    editedIndex: -1, // 当前编辑的行
    editFormObject: { // 编辑 表单的绑定项 设定的默认值 需要与下方defaultItem一致
      name: '',
      howContact: '',
      ID: null,
      rank: 1000,
      contribution: 0,
      awarded: false,
      missTime: 0,
    },
    defaultItem: { // 新增时的 默认值
      rank: 1000,
      awarded: false,
      missTime: 0,
    },
  }),

  computed: {
    formTitle () { // 新增/编辑 弹窗的标题
      return this.editedIndex === -1 ? '新增' : '编辑'
    },
    listData () {  // 列表数据
      return this.$store.state.module.using.peoples
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
      this.editFormObject = Object.assign({}, row)
      this.dialog = true
    },

    // 新增、编辑取消，重置编辑表单
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editFormObject = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // 删除
    deleteItem (row) {
      this.editedIndex = this.listData.indexOf(row)
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
        this.editFormObject = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // 新增/编辑   保存，如果有正在编辑的index，则是编辑，否则是新增
    save () {
      if (this.$refs.peoplesForm.validate()) {
        // 编辑
        if (this.editedIndex > -1) {
          Object.assign(this.listData[this.editedIndex], this.editFormObject)
        } else {
          // 新增
          this.editFormObject.peopleID = idCreator(this.editFormObject, this.listData.length)
          this.listData.push(this.editFormObject)
        }
      }
    }
  }
}
</script>