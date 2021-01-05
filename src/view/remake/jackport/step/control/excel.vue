<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 12:12:05
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-01-05 23:14:55
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>

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

    <!-- tab栏 有多少个sheet 创多少个，双击修改tab名 -->
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
              <v-dialog v-model="dialog"
                        max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary"
                         dark
                         v-bind="attrs"
                         v-on="on">
                    手动新增
                  </v-btn>
                  <!-- 其他按钮 -->
                  <v-btn v-for="(item,i) in btnData"
                         :key="i"
                         :disabled="item.disabled"
                         :color="item.color"
                         @click="headBtnClick(item.method,currentTab)"> {{ item.label }} </v-btn>
                  <input type="file"
                         accept=".xlsx"
                         ref="importFileDom"
                         style="display: none;"
                         @change="importFile">
                </template>
                <v-card>
                  <!-- 新增/编辑弹出框 -->
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12"
                               sm="6"
                               md="4"
                               v-for="(name, i) in sheet.columnName"
                               :key="i">
                          <v-text-field v-model="editedItem.name"
                                        :label="name"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1"
                           text
                           @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1"
                           text
                           @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete"
                        max-width="500px">
                <v-card>
                  <v-card-title class="headline">是否删除</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1"
                           text
                           @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1"
                           text
                           @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-toolbar>
          </template>
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
          <!-- 无数据 -->
          <template v-slot:no-data>
            <h1>暂无数据。请导入，或手动新增</h1>
          </template>
        </v-data-table>

      </v-card>
    </v-tab-item>
  </v-tabs>
</template>
<script>
import XLSX from 'xlsx';

export default {
  data: () => ({

    sheetData: null,
    // 表格名
    tabName: ['暂无数据'],
    btnData: [
      { label: '导入表格', color: 'warning', method: 'toImportFile', disabled: false },
      { label: '添加奖池', color: 'success', method: 'addTab', disabled: false },
      { label: '清空该奖池', color: 'error', method: 'delCurrentTab', disabled: false },
    ],
    currentTab: 0,
    defaultData: [
      {
        headers: [
          { text: '奖品名称', value: '奖品名称' },
          { text: '数量', value: '数量' },
          { text: '赞助人', value: '赞助人' },
          { text: '单个价值', value: '单个价值' }
        ],
        data: [],
        columnName: ['奖品名称', '数量', '赞助人', '单个价值']
      }
    ],
    jackportName: '',
    // 奖池名称修改弹出框
    dialog_jackportName: false,
    dialog: false,
    dialogDelete: false,

    desserts: [],
    editedIndex: -1,

    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新增奖品' : '编辑奖品'
    },
  },

  watch: {
    // 如果是最后一个奖池 则不允许清空
    sheetData: {
      handler (n) {
        if (n === null) return
        if (n.length === 1) {
          this.btnData[2].disabled = true
        } else {
          this.btnData[2].disabled = false
        }
      },
      deep: true,
      immediate: true
    },
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    //! 更改奖池名
    dialog_jackportName (open) {
      if (open) {
        this.jackportName = this.tabName[this.currentTab]
      } else {
        this.tabName[this.currentTab] = this.jackportName
      }
    }
  },

  mounted () {
    this.sheetData = this.defaultData
  },

  methods: {
    //! tab表头按钮点击方法 触发传入的方法名 和当前tab页index值
    headBtnClick (methodsName, i) {
      this[methodsName](i)
    },
    // 导入数据
    toImportFile (i) {
      // console.log(this.$refs.importFileDom[0].dispatchEvent)
      this.$refs.importFileDom[i].dispatchEvent(new MouseEvent('click'))
    },
    // 清空当前表
    delCurrentTab (i) {
      if (this.tabName.length === 1)
        return
      this.tabName.splice(i, 1)
      this.sheetData.splice(i, 1)
    },
    addTab () {
      this.sheetData.push(this.defaultData[0])
      var tabLength = this.tabName.length
      this.tabName.push('新增奖池' + tabLength)
      this.currentTab = tabLength
    },
    // 表格导入
    importFile (e) {
      const file = e.target.files

      if (file.length === 0) {
        return
      }
      var reader = new FileReader();

      var sheetObj
      var sheetData = []
      var sheetName = []
      let self = this

      try {
        // 读取excel 转换为string
        reader.onload = function (file) {
          var data = file.target.result;
          sheetObj = XLSX.read(data, { type: 'binary' });
          // ! 将导入的excel 数据表，表名存入store中
          for (var i = 0; i < sheetObj.SheetNames.length; i++) {
            sheetData.push(XLSX.utils.sheet_to_json(sheetObj.Sheets[sheetObj.SheetNames[i]]))
            sheetName.push(sheetObj.SheetNames[i])
          }
          // 整理数据
          self.sortData(sheetData, sheetName)
        };
        reader.readAsBinaryString(file[0]);
      } catch (error) {
        return
      }
    },
    //! 数据整理
    sortData (sheetData, sheetName) {
      // todo 这里直接覆盖导致每次导入都是覆盖不是增加
      this.$store.state.module.sheetData = sheetData
      this.tabName = this.$store.state.module.sheetName = sheetName

      // console.log(sheetData)
      // console.log(sheetName)

      // 每个表的信息
      for (var i = 0; i < sheetData.length; i++) {
        var headers = []
        var tabData = []
        var columnName = []
        // 表数据
        tabData = sheetData[i]
        // 列名
        columnName = Object.keys(tabData[i])
        // console.log(sheetName)
        // 列名转换为表格组件可以用的格式
        columnName.forEach((item) => {
          headers.push(
            {
              text: item,
              value: item
            }
          )
        })
        // 增加操作列
        headers.push(
          {
            text: '操作',
            value: 'actions',
          }
        )

        if (this.sheetData[0].data.length === 0)
          this.sheetData = []

        //! 存入数据
        this.sheetData.push(
          {
            headers: headers,
            data: tabData,
            columnName: columnName
          }
        )
      }
      console.log(this.sheetData)
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
