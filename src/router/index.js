/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:41:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-29 14:41:49
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
        redirect: '/index',
        component: resolve => require(['@/view/layout'], resolve),
        children: [
            {
                // 抽奖
                path: '/random',
                name: 'random',
                component: resolve => require(['@/view/excel'], resolve)
            },
            {
                // 抽奖
                path: '/index',
                name: 'index',
                component: resolve => require(['@/view/remake'], resolve)
            },
            {
                // 轮盘测试
                path: '/wheelRandom',
                name: 'wheelRandom',
                component: resolve => require(['@/view/wheelRandom/index'], resolve)
            },
        ]
    }
]
const router = new Router({ mode: 'history', routes })
export default router