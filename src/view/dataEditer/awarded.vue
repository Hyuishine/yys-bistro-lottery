<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 18:11:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-14 20:32:55
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 人员数据表
-->
<template>
  <v-data-table :headers="headers"
                :items="listData"
                no-results-text="没有搜索到。"
                no-data-text="暂时没有人中奖。"
                :footer-props="{
                    'items-per-page-text':'每页多少行',
                    'items-per-page-all-text':'所有'
                }"
                show-expand
                :expanded.sync="expanded"
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

    <!-- 详情下拉框 -->
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <p>奖品备注/详情： {{ item.giftRemark || '暂无' }}</p>
        <p>赞助人备注 {{ item.sponsorRemarks || '暂无' }}</p>
      </td>
    </template>

    <!-- 操作列 -->
    <template v-slot:item.actions="{ item }">
      <!-- 复制到剪贴板 -->
      <v-icon small
              @click="copy(item)">
        mdi-content-copy
      </v-icon>
      <!-- 发送到标题 -->
      <v-icon small
              @click="sendToTitle(item)">
        mdi-send
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    search: '', // 搜索条件
    expanded: [], // 展开的详情
    headers: [ //! 表格 列头数据 及表单项数据
      /*
        text:列名，表单label
        align:对齐方式
        vlaue:绑定的值，需要与表单绑定的 键对应
        sortable:允许排序？
        filterable:允许被搜索？
        formItem:允许被编辑新增？
      */
      { text: '中奖人称呼', align: 'start', value: 'winner', },
      { text: '赞助人称呼', value: 'sponsor' },
      { text: '奖品名称', value: 'giftName' },
      { text: '中奖数量', value: 'winningsNum' },
      { text: '中奖人联系方式', value: 'winnerContact' },
      { text: '赞助人联系方式', value: 'sponsorContact' },
      { text: '奖品备注/详情', value: 'giftRemark' },
      { text: '赞助人备注', value: 'sponsorRemarks' },
      { text: '中奖人id', value: 'winnerID', sortable: false, formItem: false },
      { text: '赞助人id', value: 'sponsorID', sortable: false, formItem: false },
      { text: '操作', value: 'actions', sortable: false, formItem: false },
    ],
    listData: [], // 列表数据
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.listData = this.$store.state.module.using.awarded
    },

    // todo 复制到剪贴板
    copy (row) {
      console.log(row)
    },

    // todo 发送到标题
    sendToTitle (row) {
      console.log(row)
    }
  }
}
</script>