/*
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-09 14:28:22
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-02-28 15:49:36
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 2022/02/28 敲定数据版本  导入sheetData(备份数据)、转换到using、然后设置下一次抽奖的 参与人(curPeoples)、抽出来后记录记录中奖数据(using)
 */


export default {
    state: {

        //! 元数据  需要导入的数据，导入数据的模板 和需要的数据
        sheetData: [
            // {
            //     name: '称呼', // 唯一，必要，通过这个来生成人员id
            //     howContact: '联系方式',
            //     rank:'斗技分'
            //     contribution:'勋章数'
            // }
        ],

        //! 正在使用的数据
        using: [
            // {
            //     name: '称呼',
            //     howContact: '联系方式',
            //     ID:'' // 生成的人员id,  
            //     rank:'斗技分'
            //     contribution:'勋章数'
            //! 以下由后续计算 或手动记录
            //     missTime:0, // 中奖错过次数
            //     awarded: false // 是否中奖
            //     giftName:'所获奖品名称',
            //     sponsorName: '奖品赞助人名称' //
            //     sponsorContact: '赞助人联系方式'
            //     giftInfo:'奖品详情',
            // }
        ],

        //! 赞助人广告
        ads: [
            // {
            // name: '', // 赞助人名称
            // content:'' // 广告内容
            // }
        ],

        //! 当前参与抽奖的人
        curPeoples: []
    }
}