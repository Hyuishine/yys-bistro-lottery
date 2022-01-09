/*
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-07 16:00:46
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-07 17:22:52
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',

  transpileDependencies: [
    'vuetify'
  ]
}
