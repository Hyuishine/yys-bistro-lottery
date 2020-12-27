<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 12:14:32
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 17:45:03
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-row justify='space-between'>
    <v-col>
      <import-excel></import-excel>
    </v-col>
    <v-col>
      <v-btn color="success"
             text>
        手动添加数据
      </v-btn>
    </v-col>
    <v-col>
      <v-btn color="warning"
             text>
        编辑数据
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import importExcel from './excel'
export default {
  components: {
    importExcel
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>