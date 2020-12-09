<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:47:40
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-09 23:31:14
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-container>
    <v-row align="center"
           justify="center">

      <v-col v-for="(item,index) in menuData"
             :key="index"
             :cols="5">
        <v-card hover>
          <v-img :src="item.src"
                 class="white--text align-end"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                 height="200px">
            <v-card-title v-text="item.title"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      menuData: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
      ],
    }
  }
}
</script>