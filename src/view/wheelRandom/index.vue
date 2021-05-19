<template>
  <v-sheet>
    <weel-random style="margin:100px auto;"
                 @scrolling_status="scrolling_status"></weel-random>
  </v-sheet>
</template>
<script>
import weelRandom from './components/weelRandom.vue';
export default {
  name: "page_weelRandom",
  components: { weelRandom },
  data () {
    return {
      // 按钮点击节流阀、按钮数据(转盘参数)
      btn_loading: false,
    }
  },
  methods: {
    // 按钮中转回调
    btn_handler (index) {
      // 开启全局节流阀，切换状态、执行按钮方法、关闭节流阀
      this.btn_loading = true
      this.btnData[index].status = !this.btnData[index].status

      setTimeout(() => {
        this.btn_loading = false
      }, 500)
    },
    // 接收轮盘回传的滚动状态，来控制按钮是否启用
    scrolling_status (status) {
      this.btn_loading = status
    }
  }
}
</script>