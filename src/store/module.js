/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-17 10:12:36
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-17 10:13:15
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
const file = require.context("@/view", true, /module.js$/);
let module = {
    state: {},
    actions: {},
    mutations: {},
    getters: {}
};
file.keys().forEach(key => {
    module.state = {
        ...module.state,
        ...(file(key).default || file(key)).state
    };
    module.getters = {
        ...module.getters,
        ...(file(key).default || file(key)).getters
    };
    module.mutations = {
        ...module.mutations,
        ...(file(key).default || file(key)).mutations
    };
});


export default module;
