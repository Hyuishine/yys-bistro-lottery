/*
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-11 23:04:23
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-11 23:51:30
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 创建人员ID 格式：称呼首字母缩写 + _con:联系方式缩写 + &表格行序号
 */
import { makePy } from './nameSort.js'

export function idCreator (row, index) {
    if (row['联系方式']) {
        return makePy(row['人员称呼']) + '_con:' + makePy(row['联系方式']) + '&' + index
    } else {
        return makePy(row.name) + '&' + '_con:' + makePy(row.howContact) + '&' + index
    }
}