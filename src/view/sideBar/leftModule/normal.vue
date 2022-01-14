<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-14 22:32:04
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-14 22:52:55
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-sheet>
    <v-switch v-model="autoSub"
              inset
              :label="autoSub ? '自动去除已抽人员' : '不自动去除已抽人员'"></v-switch>

    <v-switch v-model="sendToTitile"
              inset
              :label="sendToTitile ? '自动发送到标题' : '不自动发送到标题'"></v-switch>

    <v-switch v-model="addMaterial"
              inset
              :label="addMaterial ? '自动添加为抽奖加料' : '不为抽奖加料'"></v-switch>
  </v-sheet>
</template>
<script>
export default {
  computed: {
    autoSub: {
      get () {
        return this.$store.state.module.settings.normal.autoSub
      },
      set (n) {
        this.$store.state.module.settings.normal.autoSub = n
      }
    },
    sendToTitile: {
      get () {
        return this.$store.state.module.settings.normal.sendToTitile
      },
      set (n) {
        this.$store.state.module.settings.normal.sendToTitile = n
      }
    },
    addMaterial: {
      get () {
        return this.$store.state.module.settings.normal.addMaterial
      },
      set (n) {
        this.$store.state.module.settings.normal.addMaterial = n
      }
    },

  }
}

</script>