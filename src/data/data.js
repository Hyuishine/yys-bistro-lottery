/*
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-09 14:28:22
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-27 12:47:32
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 2022/01/24 敲定数据版本
 */

// 全局数据：奖池、人员、获奖数据
export default {
    state: {

        //! 元数据  需要导入的数据，导入数据的模板 和需要的数据
        sheetData: {

            peoples: [
                // {
                //     name: '称呼', // 唯一，必要，通过这个来生成人员id
                //     howContact: '联系方式',
                //     ID:'游戏ID', 
                //     rank:'斗技分'
                //     contribution:'勋章数'
                // }
            ],

            gifts: [
                // {
                //     name: '称呼', 
                //     howContact: '联系方式',
                //     giftName: '赞助奖品名称',
                //     giftAmount: '赞助数量',
                //     giftInfo: '奖品详情',
                //     sponsorAD:'赞助人广告',
                //     giftID:'奖品ID'
                // }
            ]

        },

        //! 正在使用的数据
        using: {

            // 人员
            peoples: [
                // {
                //     name: '称呼',
                //     howContact: '联系方式',
                //     ID:'游戏ID',  // 唯一，必要
                //     rank:'斗技分'
                //     contribution:'勋章数'
                //! 以下由后续计算获得
                //     missTime: '中奖错过次数',
                //     awarded: false // 是否中奖
                //     giftName:'所获奖品名称',
                //     sponsorName: '赞助人名称' //
                //     sponsorContact: '赞助人联系方式'
                //     giftInfo:'奖品详情',
                //     sponsorAD  赞助人广告
                // }
            ],

            // 奖池
            gifts: [
                // {
                //     name: '称呼', 
                //     howContact: '联系方式',
                //     giftName: '赞助奖品名称',
                //     giftAmount: '赞助数量',
                //     giftInfo: '奖品详情',
                //     sponsorAD:'赞助人广告',
                //! 以下由后续计算获得
                //     remaining: '剩余数量'
                //     giftID:'奖品ID',
                //     winner: '中奖人称呼',
                //     winnerContact: '中奖人联系方式',
                //     winnerID: '中奖人游戏ID',
                // }
            ],
        },

        // 设置
        settings: {
            jackportSettings: { //! 奖池设置
                curPeoples: [], // 本次可参与抽奖人员 数据格式同 canRandom 一致
                curGifts: {}, // 本次奖池 数据格式同 lastGifts 一致
            }
        }
    }
}