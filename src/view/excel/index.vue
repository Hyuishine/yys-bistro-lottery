<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 23:33:07
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-16 00:09:00
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div>
    <v-stepper alt-labels
               v-model="currentStep">
      <!-- 步骤条标题 -->
      <v-stepper-header>
        <v-stepper-step v-for="(title,index) in stepTitle"
                        :key="index"
                        editable
                        :complete="currentStep > (index + 1)"
                        :step="(index + 1)">
          {{ title }}
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <!-- 步骤一导入数据 -->
        <v-stepper-content step="1">
          <v-card hover
                  style="margin:10px;">
            <v-file-input multiple
                          small-chips
                          accept=".xlsx"
                          truncate-length="15"
                          @change="importFile"></v-file-input>
          </v-card>

          <v-btn color="primary"
                 @click="currentStep = 2">
            导入完成
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12"></v-card>

          <v-btn color="primary"
                 @click="currentStep = 3">
            导入完成
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12"
                  color="grey lighten-1"
                  height="200px">
            <input type="file"
                   @change="importFile" />
            <div id="demo"></div>
          </v-card>

          <v-btn color="primary"
                 @click="currentStep = 1">
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

  </div>
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
  data () {
    return {

      currentStep: 1,
      stepTitle: ['导入人员/奖池', '编辑信息', '导入赞助广告', '编辑赞助广告'],
      excelData: null,
      // [
      //   {
      //     headName: '',
      //     colunm: []
      //   }
      // ],
    }
  },
  methods: {
    importFile (file) {//导入
      var reader = new FileReader();
      var temp
      try {
        // 读取excel 转换为string
        reader.onload = function (file) {
          var data = file.target.result;

          temp = XLSX.read(data, { type: 'binary' });
          this.excelData = temp = XLSX.utils.sheet_to_json(temp.Sheets[temp.SheetNames[0]]);

          // 多少列
          Object.keys(temp[0]).forEach((headName, index) => {
            // headName // 列名
            // index // 第几列
            console.log(index)
            for (var i = 0; i < temp.length; i++) {
              console.log(temp[i][headName])
            }

            // console.log(headName)
            // console.log(index)
            // temp.forEach((val, index) => {
            //   val.keys
            //   console.log(index)
            // })



            // this.excelData.push(
            //   {

            //   }
            // )
          })

          console.log(Object.keys(temp[0]))
          console.log(temp)
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