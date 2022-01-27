<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2022-01-26 00:53:34
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2022-01-27 12:37:43
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div>
    <h1> 介绍：</h1>

    <h2>抽奖工具 总共分为“上、中、下、左、右” 五个部分。</h2>

    <ul>
      <li><b>上：</b>标头，左侧三个按钮分别是：“如何使用？”、“编辑数据”、“开始抽奖”。然后是标题，这里可以作
        为一个提示作用，比如说可以在这上面打上“正在抽取斗技前三奖”，告诉同学们正在抽取。。。</li>

      <li><b>中：</b>内容展示区，点击“如何使用时”，是说明书；点击“编辑数据时”，时编辑数据；点击“开始抽奖”时，
        是抽奖大转盘。</li>

      <li>
        <b>左：</b>编辑转盘中的数据项，即“当前参与抽奖人”，未选中时默认所有人。
      </li>

      <li>
        <b>右：</b>选择当前抽的奖，未选中时会有提示，且请在抽奖完成后手动记录。
      </li>

      <li>
        <b>下：</b>数据展示。展示当前数据。
      </li>
    </ul>

    <h2>使用方式：</h2>

    <ul>
      <li>点击天蓝色按钮 “编辑数据”，导入数据表格</li>

      <li>在左侧抽屉选择参与抽奖人员</li>

      <li>在右侧抽屉选择当前奖项</li>

      <li>点击绿色按钮 “开始抽奖” 则跳转到大转盘页面，点击即可抽奖，抽出来之后，会有白色卡片展示，双击则会关闭</li>
    </ul>

    <h2>注意：</h2>
    <ul>
      <li>人员数据中，游戏ID必填</li>
      <li>未选择当前奖品时，请手动记录</li>
      <li>人员数据不会自动去除已中奖人员，但奖品数据中的 剩余数量会自动减一</li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
h1 {
  line-height: 80px;
}
h2 {
  margin-bottom: 20px;
}
li {
  line-height: 30px;
  margin-bottom: 20px;
}
</style>