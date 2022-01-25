<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 14:36:24
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-26 00:35:35
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 左侧快捷抽屉，用于设置下一次抽奖参与人员
-->
<template>
  <v-card id="sideBar_left"
          :class="{statusFold:status}">

    <!-- 标题 -->
    <v-toolbar flat
               color="primary"
               dark>
      <v-toolbar-title>下一次抽奖参与人员设置(默认所有人)</v-toolbar-title>
    </v-toolbar>

    <v-autocomplete v-model="selected"
                    :items="peoples"
                    filled
                    chips
                    :filter="jackPortFilter"
                    item-text="ID"
                    label="选择这一次抽奖的参与人员"
                    return-object
                    multiple
                    persistent-hint
                    no-data-text="没有剩余可参与抽奖人员，是已抽完还是未导入？">

      <!-- 已选择视图 -->
      <template v-slot:selection="data">
        <v-chip close
                @click:close="remove(data.item)">
          {{ data.item.name + '-' + data.item.rank + '-' + data.item.contribution }}
        </v-chip>
      </template>

      <!-- // 备选视图 -->
      <template v-slot:item="data">
        <template>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle v-html="'斗技分' + data.item.rank + ',周勋章:' + data.item.rank"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>

    <!-- 折叠按钮 -->
    <v-btn class="btn_fold"
           color="primary"
           @click="status = !status">
      <v-icon>{{ status ?  'mdi-arrow-right' :'mdi-arrow-left' }}</v-icon>
    </v-btn>
  </v-card>
</template>
<script>

export default {
  name: 'sideBar_left',
  data: () => ({
    status: true // 是否折叠
  }),
  methods: {
    // 根据人员id 删除
    remove (item) {
      const index = this.selected.indexOf(item)
      if (index >= 0) this.selected.splice(index, 1)
    },

    // 编辑可参与人员的过滤函数，搜索包括昵称，id，贡献分数
    jackPortFilter (item, queryText) {
      return (item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        || (item.ID.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        || (item.contribution.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
    }
  },

  computed: {
    // 从所有奖品中过滤出剩余数量大于0的，
    peoples () {
      return this.$store.state.module.using.peoples || []
    },

    // 已选中的参与人
    selected: {
      get () {
        return this.$store.state.module.settings.jackportSettings.curPeoples
      },
      set (n) {
        this.$store.state.module.settings.jackportSettings.curPeoples = n
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.statusFold {
  transform: translateX(-100%);
}
#sideBar_left {
  top: 10%;
  height: 80%;
  width: 40%;
  min-width: 550px;
  position: fixed;
  transition: 0.2s ease-in-out;

  // $zIndex-overLay
  z-index: 90;
  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .btn_fold {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(100%, 50%);
  }
}
</style>