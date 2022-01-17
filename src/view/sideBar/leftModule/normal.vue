<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-14 22:32:04
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-17 23:26:36
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-row span="20">

    <v-col xl="6"
           cols="12">
      <v-switch v-model="autoSub"
                inset
                :label="autoSub ? '自动去除已抽人员' : '不自动去除已抽人员'"></v-switch>
    </v-col>

    <v-col xl="6"
           cols="12">
      <v-switch v-model="sendToTitile"
                inset
                :label="sendToTitile ? '自动发送到标题' : '不自动发送到标题'"></v-switch>
    </v-col>

    <v-col xl="6"
           cols="12">
      <v-switch v-model="addMaterial"
                inset
                :label="addMaterial ? '自动添加为抽奖加料' : '不为抽奖加料'"></v-switch>
    </v-col>

    <v-col xl="6"
           cols="12">
      <v-switch v-model="autoRandom"
                inset
                :label="autoRandom ? '完全随机抽奖' : '不完全随机抽奖'"></v-switch>
    </v-col>

    <!-- 奖池选择 -->
    <v-col cols="12">
      <v-card flat>
        <v-autocomplete v-model="selected"
                        :disabled="autoRandom"
                        :items="lastGifts"
                        filled
                        chips
                        :filter="jackPortFilter"
                        item-text="peopleID"
                        label="选择这一次的奖池"
                        return-object
                        multiple
                        persistent-hint
                        no-data-text="没有剩余奖品数据，是否已抽完还是未导入"
                        :hint="hint ? hint :'将根据选中的奖品数量抽出对应的人'">

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
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    hint: ''
  }),
  methods: {
    // 根据人员id 删除
    remove (item) {
      const index = this.selected.indexOf(item)
      if (index >= 0) this.selected.splice(index, 1)
    },

    // 编辑奖池的过滤函数，带赞助人昵称、礼物名称、剩余数量 则会返回结果
    jackPortFilter (item, queryText) {
      return (item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        || (item.giftName.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        || (String(item.remaining).toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
    }
  },

  watch: {
    // 当自动抽奖 打开时需要重置已选择的奖池
    autoRandom: {
      handler (n) {
        if (n) {
          this.selected = []
        }
      },
      deep: true,
      immediate: true
    },

    // 当有选中奖品时，自动算出选择了几个奖品
    selected: {
      handler (n) {
        if (n) {
          let count = 0
          n.forEach(gift => {
            count += gift.remaining
          });
          if (count) this.hint = '已选中' + count + '个奖品，本次抽奖将自动抽出' + count + '人'
        }
      },
      deep: true,
      immediate: true
    }
  },

  computed: {
    // 剩余奖品
    lastGifts () {
      return this.$store.state.module.using.lastGifts || []
    },

    // 已选中的奖池
    selected: {
      get () {
        return this.$store.state.module.settings.normal.jackportSettings.selected
      },
      set (n) {
        this.$store.state.module.settings.normal.jackportSettings.selected = n
      }
    },

    // 抽到过的，自动去除
    autoSub: {
      get () {
        return this.$store.state.module.settings.normal.autoSub
      },
      set (n) {
        this.$store.state.module.settings.normal.autoSub = n
      }
    },

    // 自动发送到标题
    sendToTitile: {
      get () {
        return this.$store.state.module.settings.normal.sendToTitile
      },
      set (n) {
        this.$store.state.module.settings.normal.sendToTitile = n
      }
    },

    // 自动添加祝福
    addMaterial: {
      get () {
        return this.$store.state.module.settings.normal.addMaterial
      },
      set (n) {
        this.$store.state.module.settings.normal.addMaterial = n
      }
    },

    // 自动抽奖：先抽奖品-获取到提供人数后,再抽对应的人数
    autoRandom: {
      get () {
        return this.$store.state.module.settings.normal.autoRandom
      },
      set (n) {
        this.$store.state.module.settings.normal.autoRandom = n
      }
    },
  }
}

</script>