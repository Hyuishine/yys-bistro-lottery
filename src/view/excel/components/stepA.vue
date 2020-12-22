<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-21 19:17:53
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-22 16:54:18
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
  cname: '导入人员/奖池',
  methods: {
    importFile (file) {//导入
      if (file.length === 0) {
        return
      }
      var reader = new FileReader();
      var sheetObj
      var tempArr = []
      let self = this

      try {
        // 读取excel 转换为string
        reader.onload = function (file) {
          var data = file.target.result;
          sheetObj = XLSX.read(data, { type: 'binary' });
          // ! 存入store中
          for (var i = 0; i < sheetObj.SheetNames.length; i++) {
            // todo 拿到
            tempArr.push(XLSX.utils.sheet_to_json(sheetObj.Sheets[sheetObj.SheetNames[i]]))
            // 
            console.log(sheetObj.SheetNames[i])
          }
          self.$store.state.module.sheetData = tempArr
          console.log(tempArr)
        };
        reader.readAsBinaryString(file[0]);
      } catch (error) {
        return
      }
    },
    fixdata (data) { //文件流转BinaryString
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    }
  }
}
</script>