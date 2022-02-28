<template>
  <div id="component_startControl">
    <!-- 开始前设置 -->
    <v-row align="center"
           justify="center">
      <v-col :cols="2"
             v-for="(checkBox,i) in checkBox_control"
             :key="i">
        <!-- 标题 -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <p v-bind="attrs"
               v-on="on">{{ checkBox.label }}</p>
          </template>
          <!-- 标题hover提示 -->
          <span>{{ checkBox.desc }}</span>
        </v-tooltip>
        <!-- 复选框 -->
        <!-- 当选择了完全随机，禁用其他 -->
        <v-checkbox v-model="checkBox.status"
                    :disabled="checkBox_status(i)"
                    :label="`当前状态: ${checkBox.status ? checkBox.openTxt : checkBox.closedTxt}`">
        </v-checkbox>
      </v-col>
    </v-row>
    <!-- 开始按钮 -->
    <v-row align="center"
           justify="center">
      <v-col cols="6">
        <v-btn block
               x-large
               :disabled="btn_start_status"
               @click="btn_start_status = true"
               color="primary">
          {{ btn_start_status ? '正在随机抽取，将在0~30秒内停止并放开按钮。':'开始!' }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'component_startControl',
  props: {
    // 引用处下发的开始状态。

    // 此处点击开始 =》 此处按钮开始状态上发 =》 抽取处收到状态开始随机 =》 抽取处停止时状态下发至此 =》 此处收到状态重置按钮状态。 
    status: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 开始按钮状态、开始前设置参数。
      btn_start_status: false,
      checkBox_control: [
        { label: '正反序切换', desc: '切换正反序旋转/滚动', openTxt: '正序/顺时针', closedTxt: '反序/逆时针', status: false },
        { label: '是否回弹', desc: '临近结束时，随机回滚一段', openTxt: '随机回弹', closedTxt: '不回弹', status: false },
        { label: '完全随机', desc: '顺序随机，可能正转几圈再反转几圈；回弹随机，可能回弹，可能不回弹。', openTxt: '已开启', closedTxt: '未开启', status: false },
      ]
    }
  },
  watch: {
    // 当按钮切换时，上发切换后的按钮名、和按钮状态数据。
    checkBox_control: {
      handler (n) {
        let curStatus = []
        n.forEach((btn => {
          curStatus.push(
            {
              label: btn.label,
              status: btn.status
            }
          )
        }))
        this.$emit('startControl_change', curStatus)
      },
      deep: true,
      immediate: true
    },
    // 当开始按钮的状态改变时，上发开始状态
    btn_start_status: {
      handler (n) {
        this.$emit('startStatus_change', n)
      },
      deep: true,
      immediate: true
    },
    // 接收按钮随机是否开始的状态。
    status: {
      handler (n) {
        // 减少重赋值次数
        if (n != this.btn_start_status)
          this.btn_start_status = n
      }
    }
  },
  methods: {
    // 计算复选框是否应该禁用
    // 当开始状态为true时，禁用所有；
    // 当完全随机开启时，禁用前两个；
    // 其他情况：不禁用
    checkBox_status (i) {
      if (this.btn_start_status) {
        return true
      } else if (this.checkBox_control[2].status && i != 2) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>