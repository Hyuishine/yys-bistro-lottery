/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:41:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-09 22:48:23
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
        redirect: '/menu',
        component: resolve => require(['@/view/layout'], resolve),
        children: [
            {
                // 首页 菜单
                path: '/menu',
                name: 'menu',
                component: resolve => require(['@/view/menu'], resolve)
            },
        ]
    }
]
const router = new Router({ routes })
export default router