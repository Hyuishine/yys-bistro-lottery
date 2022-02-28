<template>
  <!-- isRunning 为true时附加autoTurn属性 -->
  <div :class="['gift-container flat', { 'autoTurn': isRunning }]">
    <div class="gift"
         v-for="(gift, index) in config.gifts"
         :key="index"
         :style="`transform: rotateX(${(rotate) * index}deg) translateZ(${translateZ}px)`">
      <template>{{ gift }}</template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gift',
  props: {
  },
  data () {
    return {
      config: {
        gifts: Array.from(new Array(25), (val, index) => { return index }),
        duration: 4000
      },
      isRunning: false,
      currentDeg: 0, // 当前角度
      targetDeg: 0, // 目标角度

      trigger: false // 开关
    }
  },
  computed: {
    rotate () {
      return 360 / this.config.gifts.length
    },
    translateZ () {
      // (高 / 2) / tan( (360 / 数量 / 2 / 180) * PI )
      return (200 / 2) / Math.tan((this.rotate / 2 / 180) * Math.PI)
    }
  },
  watch: {
    config: {
      handler () {
        this.setConfig()
      },
      deep: true
    },
    trigger () {
      this.autoTurn()
    },
    isRunning () {
      if (this.isRunning) {
        setTimeout(() => {
          this.autoTurnStop()
        }, this.config.duration + 200)
      }
    }
  },
  mounted () {
    this.setConfig()
  },
  methods: {
    setConfig () {
      // 设置目标转动角度和持续时间 开关改变时触发
      this.$el.style.setProperty('--duration', `${this.config.duration}ms`)
      this.$el.style.setProperty('--currentDeg', `-${this.currentDeg}deg`)
    },
    autoTurn () {
      // 获取随机目标角度(结束时的角度)
      let randomDeg = (Math.random() * 360) + (360 * 5)
      randomDeg -= randomDeg % this.rotate // 減去餘數，避免有高低不一的狀況
      this.targetDeg = randomDeg
      // 设置转动多少度
      this.$el.style.setProperty('--targetDeg', `-${this.targetDeg}deg`)
      // 设置回弹角度
      // this.$el.style.setProperty('--rollBackDeg', `${回弹角度}`)
      // 改变开始状态，触发器为监听 更改设置目标转动值
      this.isRunning = true
    },
    autoTurnStop () {
      // 把结束时的角度设置为当前角度(下一次开始时的角度)
      this.currentDeg = this.targetDeg % 360
      this.$el.style.setProperty('--currentDeg', `-${this.currentDeg}deg`)

      this.isRunning = false
    }
  }
}
</script>

<style lang="scss">
.gift-container {
  $duration: var(--duration);
  $targetDeg: var(--targetDeg);
  // $rollBackDeg: var(--rollBackDeg);
  $currentDeg: var(--currentDeg);

  * {
    box-sizing: border-box;
  }
  perspective: 999999px;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 200px;
  transform-style: preserve-3d;
  .gift {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 1px solid #333;
    background-color: #fff;
    font-size: 150px;
    img {
      padding: 1px;
    }
  }

  &.flat {
    transform: rotateX($currentDeg);
    &.autoTurn {
      transition: $duration ease-in-out;
      transform: rotateX($targetDeg);
    }
  }

  &.three-dimension {
    transform: rotateY(0deg) rotateX($currentDeg);
    &.autoTurn {
      // transition: $duration cubic-bezier(0.1, 0, 0, $rollBackDeg);
      transform: rotateY(0deg) rotateX($targetDeg);
    }
  }
}
</style>
