<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2022-01-07 16:51:30
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-09 23:46:36
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

# 剩余问题

# 待解决 

- // todo 项
- 编辑人员中的 奖品数据时  需要同步修改 奖池中的对应数据，意思就是说  改了people中的 gift相关的 需要查找一下 然后修改对应 gift中的数据