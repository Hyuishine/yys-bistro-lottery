<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 11:24:24
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 11:25:09
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card hover>
    <transition enter-active-class="animate__slideInUp">
      <v-card-title>
        {{ txt_title }}
      </v-card-title>
      <v-card-actions>
        <v-btn color="orange lighten-2"
               text>
          Explore
        </v-btn>
      </v-card-actions>
    </transition>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      txt_title: '1'
    }
  }
}
</script>