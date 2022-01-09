<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-11 22:27:58
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2022-01-08 17:29:19
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div id="page_home">
    <div class="header"></div>
    <div class="main">

      <data-editor></data-editor>

    </div>
  </div>
</template>

<script>
import dataEditor from '../dataEditer'
export default {
  components: { dataEditor }
}
</script>