/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:24:33
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-09 22:53:11
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
Vue.config.productionTip = false

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
