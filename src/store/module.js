/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-17 10:12:36
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-09 23:42:15
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
// 从各个文件夹找出module.js 去除里面的数据
const file = require.context("@/view", true, /data.js$/)
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
