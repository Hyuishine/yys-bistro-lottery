/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:41:29
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-26 00:53:43
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
        redirect: '/help',
        component: resolve => require(['@/view/layout'], resolve),
        children: [
            {
                // 首页
                path: '/help',
                name: 'help',
                component: resolve => require(['@/view/help/index.vue'], resolve)
            },

            {
                //! 选择抽奖工具
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

            {
                // 滚筒抽奖
                path: '/randomRoller',
                name: 'randomRoller',
                component: resolve => require(['@/view/random/roller.vue'], resolve)
            },

            {
                //! 数据编辑
                path: '/dataEditor',
                name: 'dataEditor',
                component: resolve => require(['@/view/dataEditor/index'], resolve)
            },





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