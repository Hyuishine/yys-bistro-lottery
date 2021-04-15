/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:41:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-01 16:58:40
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
        redirect: '/advanceRandom',
        component: resolve => require(['@/view/layout'], resolve),
        children: [
            {
                // 简单抽奖
                path: '/singleRandom',
                name: 'singleRandom',
                component: resolve => require(['@/view/singleRandom'], resolve)
            },
            {
                // 高级抽奖
                path: '/advanceRandom',
                name: 'advanceRandom',
                component: resolve => require(['@/view/advanceRandom'], resolve)
            },
            {
                // 轮盘测试
                path: '/wheelRandom',
                name: 'wheelRandom',
                component: resolve => require(['@/view/wheelRandom/index'], resolve)
            },
            {
                // 老虎机
                path: '/slotMachine',
                name: 'slotMachine',
                component: resolve => require(['@/view/slotMachine/index'], resolve)
            },
            {
                // 数据整理
                path: '/dataEditer',
                name: 'dataEditer',
                component: resolve => require(['@/view/dataEditer/index'], resolve)
            }
        ]
    }
]
const router = new Router({ mode: 'history', routes })
export default router