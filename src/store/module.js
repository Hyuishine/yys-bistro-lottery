/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-17 10:12:36
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-01 17:06:22
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
const file = require.context("@/view", true, /module.js$/);
let module = {
    state: {},
};
file.keys().forEach(key => {
    module.state = {
        ...module.state,
        ...(file(key).default || file(key)).state
    };
});


export default module;
