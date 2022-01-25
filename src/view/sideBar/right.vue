<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 14:36:24
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-26 00:54:56
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 右侧 快捷抽屉 用于显示当前已经产生的数据
-->
<template>
  <v-card id="sideBar_right"
          :class="{statusFold:status}">

    <!-- 标题 -->
    <v-toolbar flat
               color="primary"
               dark>
      <v-toolbar-title>下一次抽奖的奖品(默认无)</v-toolbar-title>
    </v-toolbar>

    <v-autocomplete v-model="selected"
                    :items="lastGifts"
                    filled
                    :filter="jackPortFilter"
                    item-text="giftID"
                    label="选择这一次抽取的奖品"
                    return-object
                    persistent-hint
                    no-data-text="没有剩余奖品，是已抽完还是未导入？">

      <!-- 已选择视图 -->
      <template v-slot:selection="data">
        <v-chip close
                @click:close="remove(data.item)">
          {{ data.item.giftName + '-' + data.item.remaining }}
        </v-chip>
      </template>

      <!-- // 备选视图 -->
      <template v-slot:item="data">
        <template>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.giftName"></v-list-item-title>
            <v-list-item-subtitle v-html="'剩余数量' + data.item.remaining"></v-list-item-subtitle>
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

    <!-- 折叠按钮 -->
    <v-btn class="btn_fold"
           color="primary"
           @click="status = !status">
      <v-icon>{{ status ? 'mdi-arrow-left' : 'mdi-arrow-right'}}</v-icon>
    </v-btn>

  </v-card>
</template>
<script>
export default {
  name: 'sideBar_right',
  data: () => ({
    status: true, // 是否折叠
  }),

  methods: {
    // 根据人员id 删除
    remove () {
      this.selected = {}
    },

    // 编辑奖池的过滤函数，带赞助人昵称、礼物名称、剩余数量 则会返回结果
    jackPortFilter (item, queryText) {
      return (item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        || (item.giftName.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        || (String(item.remaining).toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
    }
  },

  computed: {
    // 从所有奖品中过滤出剩余数量大于0的，
    lastGifts () {
      const source = this.$store.state.module.using.gifts
      return source.filter(
        gift => {
          return gift.remaining > 0
        }
      ) || []
    },

    // 已选中的参与人
    selected: {
      get () {
        return this.$store.state.module.settings.jackportSettings.curGifts
      },
      set (n) {
        this.$store.state.module.settings.jackportSettings.curGifts = n
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.statusFold {
  transform: translateX(100%);
}
#sideBar_right {
  top: 10%;
  height: 80%;
  width: 40%;
  min-width: 550px;
  right: 12px;
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
    left: 0;
    transform: translate(-100%, 50%);
  }
}
</style>