<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-09 14:28:13
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-27 13:20:03
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
          self.solveGifts(sheetData[1])

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
        sheetData.forEach((row) => {

          if (row['称呼'] && row['游戏ID']) {
            initData.push(
              {
                name: row['称呼'],
                howContact: row['联系方式'] || '',
                ID: row['游戏ID'] || '',
                rank: row['斗技分'] || '',
                contribution: row['勋章数'] || '',
                missTime: 0, // 中将错过次数
                awarded: false // 是否中奖
              }
            )
          }
        })

        // 存储元数据 备用
        if (initData.length !== 0) {
          this.$store.state.module.sheetData.peoples = initData // 初始数据备份
          this.$store.state.module.using.peoples = initData // 总人员数据
        }
      } catch (error) {
        alert('数据错误' + error)
      }
    },

    //! 处理奖池数据
    solveGifts (sheetData) {
      try {
        // 数据详情见：@\view\data\data.js
        let initData = []

        // 初始化数据 只有一张表
        sheetData.forEach((row, i) => {

          if (row['称呼'] && row['赞助奖品名称']) {
            // 获取元数据
            initData.push(
              {
                name: row['称呼'],
                howContact: row['联系方式'] || '',
                giftName: row['赞助奖品名称'] || '',
                giftAmount: row['赞助数量'] || 1,
                remaining: row['赞助数量'] || 1,
                giftInfo: row['奖品详情'] || '',
                sponsorAD: row['赞助人广告'] || '',
                giftID: idCreator(row, i),
              }
            )
          }
        })

        // 存储元数据 备用
        if (initData.length !== 0) {
          this.$store.state.module.sheetData.gifts = initData // 初始数据备份
          this.$store.state.module.using.gifts = initData // 总人员数据
        }
      } catch (error) {
        alert('数据错误' + error)
      }
    }
  }
}
</script>