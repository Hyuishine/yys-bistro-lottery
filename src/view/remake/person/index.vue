<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 11:29:48
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 17:25:50
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->

<template>
  <v-card hover>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                抽奖资格整理
              </v-col>
              <v-col cols="8"
                     class="text--secondary">
                <v-fade-transition leave-absolute>
                  <!-- 展开状态下的标题 -->
                  <span v-if="open"
                        key="0">
                    导入、手录 奖池数据
                  </span>
                  <!-- 关闭状态下的标题 -->
                  <span v-else
                        key="1">
                    {{ awardsNum > 0 ? '共' + awardsNum +'奖品' : '暂无人员数据' }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <!-- 内容块 -->
        <v-expansion-panel-content>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              抽取
            </v-col>
            <v-col cols="8"
                   class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open"
                      key="0">
                  展示出当前正在抽取哪个奖项/奖品
                </span>
                <span v-else
                      key="1">
                  {{ cur_awards > 0 ? '当前未抽奖品：' +cur_awards : '当前中奖人数' }}
                  <!-- 当前剩余未抽奖品：{{ cur_awards }} -->
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              后台设置
            </v-col>
            <v-col cols="8"
                   class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open">
                  在剩余奖品中随机出接下来要抽的奖品
                </span>
                <span v-else>内幕？心跳？</span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    date: null,
    // 当前剩余未抽奖品
    cur_awards: 0,
    // 整理了多少个奖品数据
    awardsNum: 0,
    trip: {
      name: '',
      location: null,
      start: null,
      end: null,
    },
    locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
  }),
}
</script>