<template>
  <v-sheet>
    <weel-random style="margin:100px auto;"
                 @scrolling_status="scrolling_status"></weel-random>
    <!-- 开始随机前的设置 -->
    <start-control @startControl_change="startControl_change"
                   @startStatus_change="startStatus_change"
                   :status="start_status"></start-control>
  </v-sheet>
</template>
<script>
import StartControl from '../../components/startControl.vue'
import weelRandom from './components/weelRandom.vue';
export default {
  name: "page_weelRandom",
  components: { weelRandom, StartControl },
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
    },
    // 接收随机开始前的设置参数
    startControl_change (curStatus) {
      console.log(curStatus)
    },
    // 接收开始按钮的状态
    startStatus_change (curStatus) {
      this.start_status = curStatus
    }
  }
}
</script>