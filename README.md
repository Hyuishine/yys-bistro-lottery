<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-07 16:51:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-02-28 15:14:19
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
# 解决方案备忘

- 如何解决打包之后需要放服务器才能使用？

```javascrpt
    - 1、配置打包环境：开发环境时为“ / ”,打包发布环境时 为“ ./ ”
    publicPath：publicPath: process.env.NODE_ENV === 'production'? './' : '/',

    - 2、如果有路由，则需要把路由模式 调整到 “ hash ” 即“ # ” 模式
```

# 优化方案

- 改为阴阳师风格方案，参见图稿中年贺样式
- 增加抽卡样式
- 数据改为不需要导入奖品数据，奖品数据改为手动记录
- 人员导入时，不再清空已中奖数据
