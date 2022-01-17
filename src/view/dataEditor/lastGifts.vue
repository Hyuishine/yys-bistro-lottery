<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 18:11:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-14 22:16:04
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 剩余奖品，对奖品进行了一次 根据剩余数量的 过滤
-->
<template>
  <v-data-table :headers="headers"
                :items="lastGifts"
                no-results-text="没有搜索到，是否需要新增？"
                no-data-text="没有数据，请在人员处导入或新增。"
                :footer-props="{
                    'items-per-page-text':'每页多少行',
                    'items-per-page-all-text':'所有'
                }"
                show-expand
                :expanded.sync="expanded"
                item-key="peopleID"
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
        <p>奖品备注： {{ item.giftRemark ? item.giftRemark : '暂无' }}</p>
      </td>
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
        // formItem:允许被编辑新增？
      */
      { text: '赞助奖品名称', align: 'start', value: 'giftName' },
      { text: '赞助人称呼', value: 'name', },
      { text: '赞助人联系方式', value: 'howContact', },
      { text: '赞助数量', value: 'giftAmount' },
      { text: '剩余数量', value: 'remaining' },
      { text: '备注/详情', value: 'giftRemark' },
      { text: '赞助人id', value: 'peopleID', sortable: false },
      { text: '操作', value: 'actions', sortable: false },
    ],
    lastGifts: []
  }),

  watch: {
    // 过滤剩余奖品数量
    '$store.state.module.using.gifts': {
      handler (allGifts) {
        if (allGifts && allGifts.length !== 0) {
          let lastGifts = []

          allGifts.forEach(gift => {
            if (gift.giftAmount && gift.giftAmount > 0) {
              lastGifts.push(gift)
            }
          })
          this.lastGifts = lastGifts
          this.$store.state.module.using.lastGifts = lastGifts
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>