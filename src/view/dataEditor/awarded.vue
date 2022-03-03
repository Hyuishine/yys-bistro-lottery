<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 18:11:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-03-03 23:05:13
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 人员数据表
-->
<template>
  <v-data-table :headers="headers"
                :items="listData"
                height="530px"
                fixed-header
                no-results-text="没有搜索到。"
                no-data-text="暂时没有人中奖。"
                :footer-props="{
                    'items-per-page-text':'每页多少行',
                    'items-per-page-all-text':'所有'
                }"
                :search="search">
    <template v-slot:top>
      <v-toolbar flat>
        <!-- 搜索 -->
        <v-text-field v-model="search"
                      append-icon="mdi-magnify"
                      label="搜索"
                      single-line
                      hide-details></v-text-field>

        <v-spacer></v-spacer>

      </v-toolbar>
    </template>

    <!-- 操作列 -->
    <template v-slot:item.actions="{ item }">
      <!-- 复制到剪贴板 -->
      <v-icon small
              @click="copy(item)">
        mdi-content-copy
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    search: '', // 搜索条件
    headers: [ //! 表格 列头数据 及表单项数据
      /*
        text:列名，表单label
        align:对齐方式
        vlaue:绑定的值，需要与表单绑定的 键对应
        sortable:允许排序？
        filterable:允许被搜索？
        formItem:允许被编辑新增？
      */
      { text: '中奖人称呼', align: 'start', value: 'name', },
      { text: '所中奖品', value: 'giftName' },
      { text: '奖品赞助人', value: 'sponsorName', },
      { text: '奖品详情', value: 'giftInfo', },
      { text: '操作', value: 'actions', sortable: false, formItem: false },
    ]
  }),

  computed: {
    // 列表数据 从奖池数据中过滤出 人员数据中 awarded 为true的数据
    listData () {
      const source = this.$store.state.module.using
      return source.filter(
        people => {
          return people.awarded
        }
      )
    }
  },

  methods: {

    // todo 复制到剪贴板
    copy (row) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(row);
      }
    }
  }
}
</script>