<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-09 14:28:13
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-11 23:38:49
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card>
    <v-card-title>
      <!-- 初始数据 -->
      <v-file-input multiple
                    small-chips
                    accept=".xlsx"
                    label="点此导入 初始数据"
                    show-size
                    hint="每次导入均会覆盖原有导入数据"
                    truncate-length="15"
                    @change="importFile($event,'初始数据')"></v-file-input>

      <v-spacer></v-spacer>

      <!-- 备份数据 -->
      <v-file-input multiple
                    small-chips
                    accept=".xlsx"
                    label="点此导入 备份数据，以恢复"
                    show-size
                    hint="每次导入均会覆盖原有导入数据"
                    truncate-length="15"
                    @change="importFile($event,'恢复备份')"></v-file-input>
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
    importFile (file, type) {
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

          // ! 将导入的excel 数据表，表名存入store中
          for (var i = 0; i < sheetObj.SheetNames.length; i++) {
            sheetData.push(XLSX.utils.sheet_to_json(sheetObj.Sheets[sheetObj.SheetNames[i]]))
            sheetName.push(sheetObj.SheetNames[i])
          }

          switch (type) {
            case '初始数据': {
              self.solveInit(sheetData)
              break
            }
            case '恢复备份': {
              self.solveBackup()
              break
            }
          }
        };
        reader.readAsBinaryString(file[0]);
      } catch (error) {
        alert('导入的文件格式可能不受支持，请查看模板')
        console.log(error)
      }
    },

    // 处理 初始化数据 数据需要与data中一致
    solveInit (sheetData) {

      try {
        // 数据详情见：@\view\data\data.js
        let initData = []

        // 初始化数据 只有一张表
        sheetData[0].forEach((row, i) => {

          if (row['人员称呼']) {
            // 获取元数据
            initData.push(
              {
                name: row['人员称呼'],
                howContact: row['联系方式'] || '',
                peopleRemark: row['人员备注'] || '',
                giftName: row['赞助奖品名称'] || '',
                giftAmount: row['赞助数量'] || '',
                giftRemark: row['奖品备注/详情'] || '',
                peopleID: idCreator(row, i),
              }
            )
          }
        })

        // 存储元数据 备用
        if (initData.length !== 0) {
          this.$store.state.sheetData = initData
          this.initializeData(initData)
        }
      } catch (error) {
        alert('数据错误' + error)
      }
    },

    //! 初始化数据，数据需要与data中一致
    initializeData (sheetData) {
      // 数据详情见：@\view\data\data.js
      let using = {
        peoples: [],
        gifts: [],
        awarded: []
      }

      sheetData.forEach(row => {
        // 人员数据
        using.peoples.push({
          name: row.name, // 称呼
          howContact: row.howContact, // 联系方式
          missTime: 0, // 中奖错过次数
          giftName: row.giftName, // 赞助奖品名称
          peopleRemark: row.peopleRemark, // 备注
          giftRemark: row.giftRemark, // 奖品备注/ 详情
          peopleID: row.peopleID, // 人员id
          awarded: '否', // 是否中奖
        })

        // 奖池
        if (row.giftName && row.giftName !== '') {
          using.gifts.push(
            {
              name: row.name, // 赞助人称呼
              giftName: row.giftName, // 赞助奖品名称,
              giftAmount: row.giftAmount,// 提供数量
              remaining: row.giftAmount,// 剩余数量
              giftRemark: row.giftRemark, // 备注/详情
              peopleID: row.peopleID // 赞助人id,
            }
          )
        }
      })
      this.$store.state.module.using = using
    },

    // 处理备份恢复数据
    solveBackup (sheetData) {


      console.log(sheetData)
    }
  }
}
</script>