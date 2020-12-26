<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 08:56:49
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 11:31:42
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-row dense>
    <v-col cols="12">
      <title-adv></title-adv>
    </v-col>
    <v-col cols="6">
      <person></person>
    </v-col>
    <v-col cols="6">
      <jackport></jackport>
    </v-col>
  </v-row>
</template>
<script>
import titleAdv from './titleAdv'
import person from './person'
import jackport from './jackport'
export default {
  components: {
    titleAdv, person, jackport
  },
}
</script>