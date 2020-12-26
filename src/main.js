/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:24:33
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 09:19:03
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router";
import Router from "vue-router";
import XLSX from 'xlsx';
import store from "./store/index";
import JSZip from "jszip";
import echarts from 'echarts'
import animated from 'animate.css'

Vue.use(animated)
Vue.use(XLSX)
Vue.use(JSZip)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
