/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:41:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-10 15:05:28
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
        redirect: '/random',
        component: resolve => require(['@/view/layout'], resolve),
        children: [
            {
                // 首页 菜单
                path: '/menu',
                name: 'menu',
                component: resolve => require(['@/view/menu'], resolve)
            },
            {
                // 统计图
                path: '/analysis',
                name: 'analysis',
                component: resolve => require(['@/view/analysis'], resolve)
            },
            {
                // excel 导入
                path: '/excel',
                name: 'excel',
                component: resolve => require(['@/view/excel'], resolve)
            },
            {
                // 抽奖
                path: '/random',
                name: 'random',
                component: resolve => require(['@/view/random'], resolve)
            },
        ]
    }
]
const router = new Router({ routes })
export default router