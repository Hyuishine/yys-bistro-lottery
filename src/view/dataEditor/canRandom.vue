<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-08 18:11:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-24 21:15:32
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 可参与抽奖的人员数据表(剩余没中奖人员)
-->
<template>
  <v-data-table :headers="headers"
                :items="listData"
                no-results-text="没有搜索到，是否需要新增？"
                no-data-text="没有数据，请导入或新增。"
                :footer-props="{
                    'items-per-page-text':'每页多少行',
                    'items-per-page-all-text':'所有'}"
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
  </v-data-table>
</template>
<script>

export default {
  data: () => ({
    search: '', // 搜索条件
    dialog: false, // 新增/修改 弹窗是否显示状态
    dialogDelete: false, // 删除弹窗的状态
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
      { text: '称呼', align: 'start', value: 'name', },
      { text: '联系方式', value: 'howContact' },
      { text: '游戏ID', value: 'ID' },
      { text: '斗技分', value: 'rank' },
      { text: '勋章数', value: 'contribution' },
      { text: '中奖错过次数', value: 'missTime' },
    ],
  }),

  computed: {
    listData () {  // 列表数据 从人员数据中过滤出 没有中过奖的人
      const source = this.$store.state.module.using.peoples
      return source.filter(
        people => {
          return people.awarded || people
        }
      )
    }
  }
}
</script>