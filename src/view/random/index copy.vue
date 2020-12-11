<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-10 15:01:37
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-10 15:45:40
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div class="randomContainer">
    <div class="content">
      <v-card hover
              v-for="index in 200"
              :key="index">
        <p>{{ index }}</p>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.randomContainer {
  height: 100px;
  margin-top: 200px;
  width: 100%;
  overflow-x: scroll;
  position: absolute;
  .content {
    width: inherit;
    display: flex;
    .v-card {
      margin-right: 20px;
      padding: 20px;
      p {
        margin: 0;
      }
    }
  }
}
</style>