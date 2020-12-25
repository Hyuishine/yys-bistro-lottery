<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-21 19:17:53
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-25 02:17:33
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-file-input multiple
                small-chips
                accept=".xlsx"
                show-size
                hint="每次导入均会覆盖原有导入数据"
                truncate-length="15"
                @change="importFile"></v-file-input>
</template>
<script>
import XLSX from 'xlsx';
/*
FileReader共有4种读取方法：
1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
2.readAsBinaryString(file)：将文件读取为二进制字符串
3.readAsDataURL(file)：将文件读取为Data URL
4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
 */
export default {
  name: 'stepOne',
  cname: '导入事项数据',
  methods: {
    importFile (file) {//导入
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
    exportFile () {

    }
  }
}
</script>