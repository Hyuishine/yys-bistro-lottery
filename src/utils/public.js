/*
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-18 21:18:02
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-03-03 22:58:38
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */

import store from '@/store/index.js'

// 设置
const module = store.state.module

//! 记录抽奖信息 peopleInfo:中奖人信息
export function logWinner (peopleInfo, giftInfo) {
    // 角色序号
    const peopleIndex = module.using.indexOf(peopleInfo)

    // 标记为已中奖
    module.using[peopleIndex].awarded = true

    // 记录手动记载的东西
    if (giftInfo) {
        module.using[peopleIndex].giftName = giftInfo.giftName || ''// 所获奖品名称
        module.using[peopleIndex].sponsorName = giftInfo.sponsorName || ''// 奖品赞助人名称
        module.using[peopleIndex].sponsorContact = giftInfo.giftName || ''// 赞助人联系方式
        module.using[peopleIndex].giftInfo = giftInfo.giftName || '' // 奖品详情
    }
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