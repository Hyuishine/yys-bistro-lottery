<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-11 22:27:58
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-14 21:23:08
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div id="page_home">

    <div :key="i"
         v-for="(module,i) in modules">
      <component v-if="status === module.status"
                 :is="module.status" />
    </div>
  </div>
</template>

<script>
import dataEditor from '../dataEditer'
import randomWheel from '../random/wheel.vue'
export default {
  components: { dataEditor, randomWheel },
  data: () => ({
    modules: [ // 组件数据,path：组件对象，status：状态名
      { path: dataEditor, status: 'dataEditor' },
      { path: randomWheel, status: 'randomWheel' },
    ],
    status: 'dataEditor' // 当前显示的组件
  })
}
</script>