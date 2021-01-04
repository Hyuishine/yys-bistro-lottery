<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 12:12:05
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-01-04 20:48:45
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-data-table :headers="headers"
                :items="desserts"
                sort-by="calories"
                class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>奖池数据表</v-toolbar-title>
        <v-divider class="mx-4"
                   inset
                   vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog"
                  max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary"
                   dark
                   class="mb-2"
                   v-bind="attrs"
                   v-on="on">
              手动新增
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12"
                         sm="6"
                         md="4">
                    <v-text-field v-model="editedItem.name"
                                  label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="4">
                    <v-text-field v-model="editedItem.calories"
                                  label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="4">
                    <v-text-field v-model="editedItem.fat"
                                  label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="4">
                    <v-text-field v-model="editedItem.carbs"
                                  label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="4">
                    <v-text-field v-model="editedItem.protein"
                                  label="Protein (g)"></v-text-field>
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
      <v-btn color="primary"
             @click="test">
        导入表格
        <v-icon right
                dark>
          mdi-cloud-upload
        </v-icon>
      </v-btn>
      <input type="file"
             accept=".xlsx"
             ref="importFileDom"
             style="display: none;"
             @change="importFile">
    </template>
  </v-data-table>
</template>
<script>
import XLSX from 'xlsx';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
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
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    // this.initialize()
  },

  methods: {
    importFile (e) {//导入
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
          self.$store.state.module.sheetData = sheetData
          self.$store.state.module.sheetName = sheetName

          console.log(sheetName)
          console.log(sheetData)
        };
        reader.readAsBinaryString(file[0]);
      } catch (error) {
        return
      }
    },
    test () {
      this.$refs.importFileDom.dispatchEvent(new MouseEvent('click'))
    },
    initialize () {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ]
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
