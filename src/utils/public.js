/*
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-18 21:18:02
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-02-28 15:51:45
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */

import store from '@/store/index.js'

// 设置
const module = store.state.module

//! 记录抽奖信息 peopleInfo:中奖人信息
export function logWinner (peopleInfo) {
    // 角色序号
    const peopleIndex = module.using.indexOf(peopleInfo)

    // 标记为已中奖
    module.using[peopleIndex].awarded = true


    // todo 改为手动记录

    // if (giftIndex !== -1) {

    // } else {
    //     module.using[peopleIndex].giftName = '未选择奖品，为手动记录的人员' // 所获奖品名称
    // }
}

//! 记录中奖错过次数
export function logMiss (ID) {
    // 角色序号
    const peopleIndex = module.using.findIndex(
        people => {
            return people.ID === ID
        }
    )

    module.using[peopleIndex].missTime++
}