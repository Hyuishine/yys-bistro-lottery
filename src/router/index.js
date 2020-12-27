/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:41:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-27 17:48:17
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
    {
        path: '/',
        redirect: '/excel',
        component: resolve => require(['@/view/layout'], resolve),
        children: [
            {
                // excel 导入
                path: '/excel',
                name: 'excel',
                component: resolve => require(['@/view/excel'], resolve)
            },
        ]
    }
]
const router = new Router({ routes })
export default router