/*
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-18 21:18:02
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-18 22:49:35
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */

import store from '@/store/index.js'

// 设置
const settings = store.state.module.settings

/* 
    name:   去除可参与抽奖资格
    info:   如果常规设置中开启了 自动去除 已中奖人员的再次中奖资格，则从剩余可参与抽奖人员中删除掉
    params: peopleID：人员ID
*/
export function subAwardPeople (peopleID) {

    if (peopleID && settings.normal.autoSub) {
        const peopleIndex = store.state.module.using.canRandom.findIndex((people) => {
            return people.peopleID === peopleID
        })

        store.state.module.using.canRandom.splice(peopleIndex, 1)
    }
}

/* 
    name:   当前随机项
    info:   如果常规设置中选择本次随机的奖品、或人员，则返回选中的数据，没有则返回剩余奖品、或剩余可参与抽奖人员
    params: type:人员/奖品
*/
export function curRandomItems (type) {
    let result = []

    switch (type) {
        case '人员': {
            if (settings.normal.jackportSettings.curPeoples.length) {
                result = settings.normal.jackportSettings.curPeoples
            } else {
                result = store.state.module.using.canRandom
            }

            break
        }

        case '奖品': {
            if (settings.normal.jackportSettings.curGifts.length) {
                result = settings.normal.jackportSettings.curGifts
            } else {
                result = store.state.module.using.lastGifts
            }

            break
        }
    }

    return result
}