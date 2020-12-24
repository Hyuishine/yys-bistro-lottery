<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-17 09:52:49
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-23 15:26:06
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card>
    <v-tabs center-active
            color="primary"
            light>
      <!-- tab栏 有多少个sheet 创多少个 -->
      <v-tab v-for="(name,i) in sheetName"
             :key="i">{{ name }}</v-tab>
      <!-- 表数据 -->
      <v-tab-item v-for="(sheet,i) in sheetData"
                  :key="i">
        <v-card flat>
          <v-data-table :headers="sheet.headers"
                        :items="sheet.data">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>请检查表格数据，有误请修改</v-toolbar-title>
                <v-divider class="mx-4"
                           inset
                           vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                       dark
                       @click="fileCreate"
                       class="mb-2">
                  生成文件
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>
<script>
import JSZip from "jszip";

export default {
  name: 'stepTwo',
  cname: '手录/编辑信息',
  mounted () {
    this.sheetName = this.$store.state.module.sheetName
    var sheets = this.$store.state.module.sheetData

    var sheetData = []
    var sheetName = []
    var headers = []
    // 每个表的信息
    for (var i = 0; i < sheets.length; i++) {
      // 表数据
      sheetData = sheets[i]
      // 列名
      sheetName = Object.keys(sheetData[i])
      // 列名转换为表格组件可以用的格式
      sheetName.forEach((item) => {
        headers.push(
          {
            text: item,
            value: item
          }
        )
      })
      //! 存入数据
      this.sheetData.push(
        {
          headers: headers,
          data: sheetData
        }
      )
    }

  },
  data () {
    return {
      url: '',// 链接
      dialog: false,
      // 表格数据
      sheetData: [
        // {
        //   headers: [],
        //   data: []
        // }
      ],
      // 表格名
      sheetName: [],
    }
  },
  methods: {

    fileCreate () {
      // const zip = new JSZip();
      console.log(new JSZip())
      // zip.files(
      //   `test`,
      //   'hello Word'
      // );
      // zip.generateAsync({ type: "blob" }).then(
      //   blob => {
      //     downloadBlobFile(blob, `模板.zip`);
      //   },
      //   err => {
      //     alert("导出失败");
      //   }
      // );
    }
  }
}
</script>