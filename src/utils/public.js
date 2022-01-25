/*
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-18 21:18:02
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-25 23:54:50
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
    const peopleIndex = module.using.peoples.indexOf(peopleInfo)

    // 赞助奖品序号
    const giftIndex = module.using.gifts.indexOf(module.settings.jackportSettings.curGifts)

    // 更新赞助奖品的数据
    module.using.gifts[giftIndex].remaining-- // 剩余数量减一
    module.using.gifts[giftIndex].winner = peopleInfo.name // 记录中奖人昵称
    module.using.gifts[giftIndex].winnerContact = peopleInfo.howContact // 记录中奖人联系方式
    module.using.gifts[giftIndex].winnerID = peopleInfo.ID // 记录中奖人游戏id


    // 更新中奖人数据
    module.using.peoples[peopleIndex].awarded = true // 标记为已中奖
    module.using.peoples[peopleIndex].prize = module.using.gifts[giftIndex].giftName // 所获奖品名称
    module.using.peoples[peopleIndex].sponsorName = module.using.gifts[giftIndex].giftName // 赞助人昵称
    module.using.peoples[peopleIndex].sponsorContact = module.using.gifts[giftIndex].howContact // 赞助人联系方式
    module.using.peoples[peopleIndex].giftInfo = module.using.gifts[giftIndex].giftInfo // 赞助人联系方式
    module.using.peoples[peopleIndex].sponsorAD = module.using.gifts[giftIndex].sponsorAD // 赞助人广告

    // 当前选中奖品剩余数量为零时清空，否则剩余数量-1
    if (module.using.gifts[giftIndex].remaining === 0) {
        module.settings.jackportSettings.curGifts = {}
    } else {
        module.settings.jackportSettings.curGifts.remaining--
    }
}

//! 当前是否有选择了 抽哪个奖？
// 返回值：true，false
export function hasCurGift () {

    const curGift = module.settings.jackportSettings.curGifts
    let result = true

    if (JSON.stringify(curGift) === '{}') {
        alert('当前未选择  需要抽取哪个奖品')
        result = false
    }
    return result
}

//! 记录中奖错过次数
export function logMiss (ID) {
    // 角色序号
    const peopleIndex = module.using.peoples.findIndex(
        people => {
            return people.ID === ID
        }
    )

    module.using.peoples[peopleIndex].missTime++
}