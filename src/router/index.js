/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:41:29
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-17 21:34:54
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
        redirect: '/home',
        component: resolve => require(['@/view/layout'], resolve),
        children: [
            {
                // 首页
                path: '/home',
                name: 'home',
                component: resolve => require(['@/view/home/index.vue'], resolve)
            },

            {
                // 选择抽奖工具
                path: '/random',
                name: 'random',
                component: resolve => require(['@/view/random/index.vue'], resolve)
            },

            {
                // 转盘抽奖
                path: '/randomWheel',
                name: 'randomWheel',
                component: resolve => require(['@/view/random/wheel.vue'], resolve)
            },

            // {
            //     // 数据导入
            //     path: '/dataImport',
            //     name: 'dataImport',
            //     component: resolve => require(['@/view/dataManage/import/index'], resolve)
            // },





            // {
            //     // 简单抽奖
            //     path: '/singleRandom',
            //     name: 'singleRandom',
            //     component: resolve => require(['@/view/singleRandom'], resolve)
            // },
            // {
            //     // 简单抽奖
            //     path: '/singleRandom',
            //     name: 'singleRandom',
            //     component: resolve => require(['@/view/singleRandom'], resolve)
            // },
            // {
            //     // 高级抽奖
            //     path: '/advanceRandom',
            //     name: 'advanceRandom',
            //     component: resolve => require(['@/view/advanceRandom'], resolve)
            // },
            // {
            //     // 轮盘测试
            //     path: '/wheelRandom',
            //     name: 'wheelRandom',
            //     component: resolve => require(['@/view/wheelRandom/index'], resolve)
            // },
            // {
            //     // 老虎机
            //     path: '/slotMachine',
            //     name: 'slotMachine',
            //     component: resolve => require(['@/view/slotMachine/index'], resolve)
            // },
            // {
            //     // 数据整理
            //     path: '/dataEditer',
            //     name: 'dataEditer',
            //     component: resolve => require(['@/view/dataEditer/index'], resolve)
            // }
        ]
    }
]
const router = new Router({ mode: 'hash', routes })
export default router