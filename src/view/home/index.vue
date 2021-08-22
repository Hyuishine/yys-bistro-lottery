<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-11 22:27:58
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-22 21:03:32
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-row>
    <!-- 左侧数据管理 -->
    <v-col cols="6">
      <v-row>
        <v-col cols="5">
          <v-row>
            <v-col cols="12">
              <v-card hover>奖池管理</v-card>
            </v-col>
            <v-col cols="12">
              <v-card hover>人员管理</v-card>
            </v-col>
            <v-col cols="12">
              <v-card hover>赞助管理</v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="7">
          <v-card hover
                  @click="toImport()">一键导入数据</v-card>
        </v-col>
      </v-row>
    </v-col>
    <!-- 右侧抽奖情况 -->
    <v-col cols="6">
      <v-row>
        <v-col cols="7">
          <v-card hover>随机出抽奖方式</v-card>
        </v-col>
        <v-col cols="5">
          <v-row>
            <v-col cols="12">
              <v-card hover>转盘抽奖</v-card>
            </v-col>
            <v-col cols="12">
              <v-card hover>老虎机滚筒</v-card>
            </v-col>
            <v-col cols="12">
              <v-card hover>普通格子抽奖</v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card hover>中奖情况统计图</v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'pageHome',
  mounted () {
    console.log(this)
  },
  methods: {
    // 跳往导入数据页，
    toImport () {
      this.$router.push(
        {
          name: 'dataImport'
        }
      )
    }
  }
}
</script>