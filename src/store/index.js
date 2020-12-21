/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-10 13:53:55
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-17 10:15:00
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
import Vue from "vue";
import Vuex from "vuex";
import module from './module'

// 告诉 vue “使用” vuex
Vue.use(Vuex);
// 需要维护的状态
const store = new Vuex.Store({
    modules: {
        //项目相关
        module
    }
});
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default store;
