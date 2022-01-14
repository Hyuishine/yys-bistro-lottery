<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 18:11:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-14 22:16:11
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 总奖池
-->
<template>
  <v-data-table :headers="headers"
                :items="listData"
                no-results-text="没有搜索到，是否需要新增？"
                no-data-text="没有数据，请在人员处导入或新增。"
                :footer-props="{
                    'items-per-page-text':'每页多少行',
                    'items-per-page-all-text':'所有'
                }"
                item-key="peopleID"
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

        <!-- 修改弹窗 -->
        <v-dialog v-model="dialog"
                  max-width="500px">

          <v-card>
            <!-- 修改  弹窗标题 -->
            <v-card-title>
              <span class="text-h5">编辑</span>
            </v-card-title>

            <!-- 修改 表单项 ,当列项数据 headers 中的formItem值为flase 时不创建-->
            <v-card-text>
              <v-container>

                <v-form ref="giftForm"
                        lazy-validation>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="editFormObject.giftName"
                                    label="赞助奖品名称"
                                    :counter="20"
                                    required
                                    :rules="formRule.giftName"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field v-model.number="editFormObject.giftAmount"
                                    label="赞助数量"
                                    required
                                    :rules="formRule.giftAmount"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea v-model="editFormObject.giftRemark"
                                  auto-grow
                                  label="奖品备注/详情"
                                  rows="1" />
                    </v-col>
                  </v-row>
                </v-form>

              </v-container>
            </v-card-text>

            <!-- 修改弹窗 操作按钮 -->
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

  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    search: '', // 搜索条件
    dialog: false, // 修改 弹窗是否显示状态
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
      { text: '赞助奖品名称', align: 'start', value: 'giftName' },
      { text: '赞助人称呼', value: 'name', },
      { text: '赞助人联系方式', value: 'howContact', },
      { text: '赞助数量', value: 'giftAmount' },
      { text: '剩余数量', value: 'remaining' },
      { text: '备注/详情', value: 'giftRemark' },
      { text: '赞助人id', value: 'peopleID', sortable: false },
      { text: '操作', value: 'actions', sortable: false },
    ],
    formRule: {
      giftName: [v => !!v || '赞助奖品名称必填'],
      giftAmount: [v => !!v && typeof v === 'number' && v > 1 || '赞助数量必须大于或等于1'],
    },
    editedIndex: -1, // 当前编辑的行
    editFormObject: { // 编辑 表单的绑定项
      name: '',
      howContact: '',
      giftAmount: 1,
      remaining: 1,
      giftName: '',
      giftRemark: '',
    }
  }),

  computed: {
    listData () {  // 列表数据
      return this.$store.state.module.using.gifts
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
        this.editedIndex = -1
      })
    },

    // 删除
    deleteItem (row) {
      this.editedIndex = this.listData.indexOf(row)
      this.editFormObject = Object.assign({}, row)
      this.dialogDelete = true
    },

    // 确定删除，将当前编辑的行index给删掉
    deleteItemConfirm () {
      this.syncEdit()
      this.listData.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    // 取消删除 重置编辑表单
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },

    // 编辑   保存
    save () {
      if (this.$refs.giftForm.validate()) {
        Object.assign(this.listData[this.editedIndex], this.editFormObject)
        this.syncEdit(this.close())
      }
    },

    // 同步修改人员信息
    syncEdit (callBack) {
      // 人员id，人员信息，该奖品在奖池中对应的人员信息的序列号
      const peopleID = this.editFormObject.peopleID || this.listData[this.editedIndex].peopleID

      let peopleInfo = this.$store.state.module.using.peoples

      const peopleIndex = peopleInfo.findIndex((people) => {
        return people.peopleID === peopleID
      })


      switch (true) {

        // 如果有奖品名称，则修改
        case !!this.editFormObject.giftName: {
          peopleInfo[peopleIndex].giftName = this.editFormObject.giftName // 奖品名称
          peopleInfo[peopleIndex].giftAmount = this.editFormObject.giftAmount // 赞助数量
          peopleInfo[peopleIndex].giftRemark = this.editFormObject.giftRemark // 奖品备注

          break
        }

        // 如果没有奖品名称 则删除
        case !this.editFormObject.giftName: {
          peopleInfo[peopleIndex].giftName = '' // 奖品名称
          peopleInfo[peopleIndex].giftAmount = '' // 赞助数量
          peopleInfo[peopleIndex].giftRemark = '' // 奖品备注

          break
        }

        // 如果点了 操作列上的删除
        case this.dialogDelete: {
          peopleInfo[peopleIndex].giftName = '' // 奖品名称
          peopleInfo[peopleIndex].giftAmount = '' // 赞助数量
          peopleInfo[peopleIndex].giftRemark = '' // 奖品备注

          break
        }
      }

      callBack && callBack()
    }
  }
}
</script>