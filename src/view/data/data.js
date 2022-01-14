/*
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-09 14:28:22
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-14 20:27:25
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */

// 全局数据：奖池、人员、获奖数据
export default {
    state: {

        //! 模板数据
        // template: [
        // {
        //     name: '人员称呼', // 唯一，必要，通过这个来生成人员id
        //     howContact: '联系方式',
        //     peopleRemark: '人员备注',
        //     giftName: '赞助奖品名称',
        //     giftAmount:'赞助数量',
        //     giftRemark: '奖品备注/详情',
        // }
        // ],

        //! 元数据  需要导入的数据，导入数据的模板 和需要的数据
        sheetData: [
            // {
            //     name: '人员称呼', // 唯一，必要，通过这个来生成人员id
            //     howContact: '联系方式',
            //     peopleRemark: '人员备注',
            //     giftName: '赞助奖品名称',
            //     giftAmount: '赞助数量',
            //     giftRemark: '奖品备注/详情',
            //     peopleID: '人员id', // excel中不需要填写，自动生成
            // }
        ],

        //! 正在使用的数据
        using: {

            // 人员
            peoples: [
                // {
                //     name: '称呼',
                //     howContact: '联系方式',
                //     missTime: '中奖错过次数',
                //     giftName: '赞助奖品名称',
                //     giftAmount: '赞助数量',
                //     peopleRemark: '备注',
                //     giftRemark: '奖品备注/详情',
                //     peopleID: '人员id',
                //     awarded: false // 是否中奖
                // }
            ],

            // 奖池
            gifts: [
                // {
                //     name: '赞助人称呼',
                //     howContact: '赞助人联系方式',
                //     giftName: '赞助奖品名称',
                //     giftAmount: '提供数量',
                //     remaining: '剩余数量',
                //     giftRemark: '备注/详情',
                //     peopleID: '赞助人id',
                // }
            ],

            // 获奖数据
            awarded: [
                // {
                //     winner: '中奖人称呼',
                //     sponsor: '赞助人称呼',
                //     giftName: '奖品名称',
                //     winningsNum: '中奖数量',
                //     winnerContact: '中奖人联系方式',
                //     sponsorContact: '赞助人联系方式',
                //     giftRemark: '奖品备注/详情',
                //     sponsorRemarks: '赞助人备注',
                //     winnerID: '中奖人id',
                //     sponsorID: '赞助人id',
                // }
            ],
        },

        // 设置
        settings: {

        }
    }
}