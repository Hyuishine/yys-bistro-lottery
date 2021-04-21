<template>
  <v-sheet>
    <weel-random style="margin:100px auto; opacity: .1;"
                 :options="btnData"
                 @scrolling_status="scrolling_status"></weel-random>
    <v-row class="btn_container"
           type="flex"
           align="center"
           justify="center">
      <!-- 下方操作按钮 传入方法名、文本显示逻辑：有描述(desc)时显示desc,否则判断状态显示 -->
      <v-btn :loading="btn_loading">选择数据</v-btn>
      <v-btn v-for="(btn, i) in btnData"
             :loading="btn_loading"
             @click="btn_handler(i)"
             :key="i">{{ btn.desc ? btn.desc : (btn.status ? btn.desc_true : btn.desc_false) }}</v-btn>
    </v-row>
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
      btnData: [
        { name: 'mod', desc_true: '随机旋转', desc_false: '手动停止', status: false },
        { name: 'direction', desc_true: '顺时针旋转', desc_false: '逆时针旋转', status: true },
        { name: 'reCircle', desc_true: '开启回弹', desc_false: '关闭回弹', status: false },
      ],

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