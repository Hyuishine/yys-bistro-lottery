<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-09 14:28:13
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-02-28 15:41:57
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card>
    <v-card-title>
      <!-- 参与人员 -->
      <v-file-input multiple
                    small-chips
                    accept=".xlsx"
                    label="点此导入数据"
                    show-size
                    hint="每次导入均会覆盖原有导入数据"
                    truncate-length="15"
                    @change="importFile($event)" />
    </v-card-title>
  </v-card>
</template>
<script>
import XLSX from 'xlsx';
import { idCreator } from '@/utils/idCreator.js'
/*
FileReader共有4种读取方法：
1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
2.readAsBinaryString(file)：将文件读取为二进制字符串
3.readAsDataURL(file)：将文件读取为Data URL
4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
 */
export default {
  name: 'component_importExcel',
  methods: {

    // 导入
    importFile (file) {
      if (file.length === 0) {
        return
      }
      var reader = new FileReader();

      var sheetObj
      var sheetData = [] // 表格数据
      var sheetName = [] // 表名，即excel左下角的 表名
      let self = this

      try {
        // 读取excel 转换为string
        reader.onload = function (file) {
          var data = file.target.result;
          sheetObj = XLSX.read(data, { type: 'binary' });

          // ! 将导入的excel 数据表，表名暂存
          for (var i = 0; i < sheetObj.SheetNames.length; i++) {
            sheetData.push(XLSX.utils.sheet_to_json(sheetObj.Sheets[sheetObj.SheetNames[i]]))
            sheetName.push(sheetObj.SheetNames[i])
          }

          self.solvePeople(sheetData[0])

        };
        reader.readAsBinaryString(file[0]);
      } catch (error) {
        alert('导入的文件格式可能不受支持，请查看模板')
        console.log(error)
      }
    },

    //! 处理 参与人员数据
    solvePeople (sheetData) {
      try {
        // 数据详情见：@\data\data.js
        let initData = []

        //! 当每行数据 中存在“称呼”的数据时，视为有效数据，则整理成人员数据
        sheetData.forEach((row, i) => {

          if (row['称呼']) {
            initData.push(
              {
                name: row['称呼'],
                howContact: row['联系方式'] || '',
                ID: idCreator(row, i),
                rank: row['斗技分'] || '',
                contribution: row['勋章数'] || '',
                awarded: false, // 是否中奖
                missTime: 0, // 错过中奖次数
                giftName: '', // 所获奖品名称
                sponsorName: '', // 奖品赞助人名称
                sponsorContact: '', // 赞助人联系方式
                giftInfo: '' // 奖品详情
              }
            )
          }
        })

        // 存储元数据 备用
        if (initData.length !== 0) {
          this.$store.state.module.sheetData = initData // 初始数据备份
          this.$store.state.module.using = initData // 总人员数据
        }
      } catch (error) {
        alert('数据错误，请参照模板导入' + error)
      }
    }
  }
}
</script>