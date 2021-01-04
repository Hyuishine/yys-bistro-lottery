<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 12:12:05
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 18:30:16
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-dialog transition="dialog-bottom-transition"
            max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary"
             v-bind="attrs"
             text
             v-on="on">导入excel</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary"
                   dark>奖池数据导入</v-toolbar>
        <v-row justify="">
          <v-col cols="6"
                 offset="3">
            <import-excel></import-excel>
            <template>
                
            </template>
          </v-col>
        </v-row>
        <v-card-actions class="justify-end">
          <v-btn text
                 @click="dialog.value = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import ImportExcel from '../../../../../components/importExcel.vue'

export default {
  components: { ImportExcel },
  data () {
    return {
    }
  }
}
</script>
