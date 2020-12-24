import store from '@/store/index'
import Vue from 'vue'
/**
 * compress 是否为压缩模式
 */
export function format (txt, compress) {
  /* 格式化JSON源码(对象转换为JSON文本) */
  var indentChar = '    '
  if (/^\s*$/.test(txt)) {
    alert('数据为空,无法格式化! ')
    return
  }
  try {
    var data = eval('(' + txt + ')')
  } catch (e) {
    alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err')
    return
  }
  var draw = [],
    last = false,
    This = this,
    line = compress ? '' : '\n',
    nodeCount = 0,
    maxDepth = 0
  /**
   * indent 缩进
   */
  var notify = function (name, value, isLast, indent, formObj) {
    /* 节点计数 */
    nodeCount++
    for (var i = 0, tab = ''; i < indent; i++) tab += indentChar /* 缩进HTML */
    tab = compress ? '' : tab /* 压缩模式忽略缩进 */
    maxDepth = ++indent /* 缩进递增并记录 */
    if (value && value.constructor == Array) {
      /* 处理数组 */
      draw.push(
        tab + (formObj ? '"' + name + '":' : '') + '[' + line
      ) /* 缩进'[' 然后换行 */
      for (var i = 0; i < value.length; i++)
        notify(i, value[i], i == value.length - 1, indent, false)
      draw.push(
        tab + ']' + (isLast ? line : ',' + line)
      ) /* 缩进']'换行,若非尾元素则添加逗号 */
    } else if (value && typeof value == 'object') {
      /* 处理对象 */
      draw.push(
        tab + (formObj ? '"' + name + '":' : '') + '{' + line
      ) /* 缩进'{' 然后换行 */
      var len = 0,
        i = 0
      for (var key in value) len++
      for (var key in value) notify(key, value[key], ++i == len, indent, true)
      draw.push(
        tab + '}' + (isLast ? line : ',' + line)
      ) /* 缩进'}'换行,若非尾元素则添加逗号 */
    } else {
      if (typeof value == 'string') value = '"' + value + '"'
      draw.push(
        tab +
        (formObj ? '"' + name + '":' : '') +
        value +
        (isLast ? '' : ',') +
        line
      )
    }
  }
  var isLast = true,
    indent = 0
  notify('', data, isLast, indent, false)
  return draw.join('')
}

/**
 * 日期格式化
 * @param {*} date 时间
 * @param {*} fmt 类型 如：yyyyMMdd
 */
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

/**
 * 数字金额转中文大写
 * @param {*} money 金额
 */
function listChange (list) {
  for (let i = 0; i < list.length; i++) {
    switch (parseInt(list[i])) {
      case 0:
        list[i] = '零'
        break

      case 1:
        list[i] = '壹'
        break

      case 2:
        list[i] = '贰'
        break

      case 3:
        list[i] = '叁'
        break

      case 4:
        list[i] = '肆'
        break

      case 5:
        list[i] = '伍'
        break

      case 6:
        list[i] = '陆'
        break

      case 7:
        list[i] = '柒'
        break

      case 8:
        list[i] = '捌'
        break

      case 9:
        list[i] = '玖'
        break
    }
  }
  return list
}
export function moneyChange (money) {
  money = money.toString()
  if (money > parseInt(money)) {
    //有小数
    var intNumber = money.split('.')[0]
    var floatNumber = money.split('.')[1]

    var intList = intNumber.split('')
    intList = listChange(intList)

    var floatList = floatNumber.split('')
    floatList = listChange(floatList)
  } else {
    var intList = money.split('')
    intList = listChange(intList)
    var floatList = []
  }
  var obj = {
    intList: intList,
    floatList: floatList
  }
  return obj
}
/**
 * 删除左右两端的空格
 * @param {*} str
 */
export function trim (str) {
  if (str === '' || str === undefined) return str
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
/**
 * 获取cookie
 * @param {*} name
 */
export function getCookie (name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}
/**
 * 菜单树形数据转换
 *
 * @export
 * @param {any} menuTree
 * @param {any} temp
 */
export function menuTreeTranslate (menuTree, temp) {
  for (var i = 0; i < menuTree.length; i++) {
    if (menuTree[i].children != undefined && menuTree[i].children.length > 0) {
      temp.push(menuTree[i].id)
      menuTreeTranslate(menuTree[i].children, temp)
    }
  }
}
/**
 *
 * 部门树形转换
 * @export
 * @param {any} officeTree
 * @param {any} temp
 */
export function OfficetreeTranslate (officeTree, temp) {
  for (var i = 0; i < officeTree.length; i++) {
    if (
      officeTree[i].children != undefined &&
      officeTree[i].children.length > 0
    ) {
      temp.push(officeTree[i].id)
      OfficetreeTranslate(officeTree[i].children, temp)
    }
  }
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len ? len : 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * 返回模糊查询符合元素后的数组
 * @param {*} str 查询的字符
 * @param {*} container 查询的数组
 */
export const filterArrayByMatch = (str, container) => {
  var newList = []
  if (str === '' || str === undefined) {
    return container
  }
  //新的列表
  var startChar = str.charAt(0)
  //开始字符
  var strLen = str.length
  //查找符串的长度
  for (var i = 0; i < container.length; i++) {
    var obj = container[i]
    var isMatch = false
    for (var p in obj) {
      if (typeof obj[p] == 'function') {
        obj[p]()
      } else {
        var curItem = ''
        if (obj[p] != null) {
          curItem = obj[p]
        }
        for (var j = 0; j < curItem.length; j++) {
          if (curItem.charAt(j) == startChar) {
            if (curItem.substring(j).substring(0, strLen) == str) {
              isMatch = true
              break
            }
          }
        }
      }
    }
    if (isMatch) {
      newList.push(obj)
    }
  }
  return newList
}

/**
 * 字符串转换成二进制
 * @param {*} str
 */
export const strToBinary = str => {
  var result = []
  var list = str.split('')
  for (var i = 0; i < list.length; i++) {
    if (i != 0) {
      result.push(' ')
    }
    var item = list[i]
    var binaryStr = item.charCodeAt().toString(2)
    result.push(binaryStr)
  }
  return result.join('')
}

/**
 * 二进制转换成字符串
 * @param {} str
 */
export const binaryToStr = str => {
  var result = []
  var list = str.split(' ')
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var asciiCode = parseInt(item, 2)
    var charValue = String.fromCharCode(asciiCode)
    result.push(charValue)
  }
  return result.join('')
}

/**
 * 判断空值
 * @param {*} key
 * return boolean
 */
export const isEmpty = key => {
  if (typeof key === 'string') {
    return (
      key.toLocaleLowerCase() === 'undefined' ||
      key.toLocaleLowerCase() === 'null' ||
      key.toLocaleLowerCase() === ''
    )
  } else if (typeof key === 'number') {
    return !~key
  }
  return _.isEmpty(key)
}

/**
 * 字符串截取
 * @param {*} message
 * @param {*} len
 */
export const messageSubstring = (message, len) => {
  if (!isEmpty(message)) {
    if (typeof message !== 'string') {
      message = message.toString()
    }
    len = len || message.length
    if (message.length > len) return message.substring(0, len) + '...'
    return message
  } else {
    return '——'
  }
}

/**
 * 返回 年 第 几 周
 * @param {传入日期时间} time yyyy-MM-dd
 */
export const getWeekNumber = function (time) {
  // if (!isDate(time)) return null;
  time = new Date(time)
  const year = time.getFullYear()
  const date = new Date(time.getTime())
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  var week = new Date(date.getFullYear(), 0, 4)
  week =
    1 +
    Math.round(
      ((date.getTime() - week.getTime()) / 86400000 -
        3 +
        ((week.getDay() + 6) % 7)) /
      7
    )
  if (week < 10) {
    week = '0' + week
  }
  return year + ' 第 ' + week + ' 周'
}

/**
 * 返回 年 月 第 几 周
 * @param {传入日期时间} time yyyy-MM-dd
 */
export const getMonthWeekNumber = function (time) {
  var a = time.split('-')[0]
  var b = time.split('-')[1]
  var c = time.split('-')[2]
  var getDataConfigDate = getDataConfig(a, b, c)
  var string =
    getDataConfigDate.getYear +
    '第 ' +
    getDataConfigDate.getMonth +
    '月第 ' +
    getDataConfigDate.getWeek +
    '周'
  return string
}
function getDataConfig (a, b, c) {
  /**
   * a = d = 当前日期
   * b = 6 - w = 当前周的还有几天过完(不算今天)
   * a + b 的和在除以7 就是当天是当前月份的第几周
   */
  var date = new Date(a, parseInt(b) - 1, c),
    w = date.getDay(),
    d = date.getDate()
  if (w == 0) {
    w = 7
  }
  var config = {
    getMonth: date.getMonth() + 1,
    getYear: date.getFullYear(),
    getWeek: Math.ceil((d + 6 - w) / 7)
  }
  return config
}
/**
 * 用iframe方式下载，主要用于下载多个文件时调用，批量下载
 * 下载接口
 * url:要下载连接
 */
export const downloadFile = url => {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none' // 防止影响页面
  iframe.style.height = 0 // 防止影响页面
  iframe.src = url
  document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求
  // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
  setTimeout(() => {
    iframe.remove()
  }, 5 * 60 * 1000)
}
/**
 * 下载流文件
 * content: 二进制内容
 * fileName:要下载的文件名 必填
 * type 文件类型 非必填
 */
export const downloadBlobFile = (content, fileName, type) => {
  const blob = new Blob([content], { type: type })
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
/**
 * 返回千位分隔符处理后的数据
 */
export const thousandBitSeparator = num => {
  if (num) {
    num = num.toString()
    if (num.indexOf('.') >= 0) {
      num = num.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    } else {
      num = num.replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
    }
    return num
  }
  return 0
}

/**
 * 返回当前id的所有父级数组
 * @param {*} value 匹配的value值
 * @param {*} arr 查询的数组
 * @param {*} defaultProps 数组映射对象
 */
export const getParentIds = (value, arr, defaultProps) => {
  var parentIds = []
  var proId = defaultProps.id // id 唯一属性 用来匹配 传过来的value值
  var proCh = defaultProps.children // children 唯一属性 用来匹配 传过来的value值的父级数组
  function getParentIdsById (chArr, defaultProps) {
    var len = chArr.length // 提高查询效率
    for (let j = 0; j < len; j++) {
      if (chArr[j][proId] == value) {
        // 如果相等 退出方法
        var parentId = isEmpty(chArr[j].parentId) ? '' : chArr[j].parentId
        parentIds.push(parentId)
        break
      }
      if (chArr[j][proCh] && chArr[j][proCh].length >= 0) {
        // 如果有子数组
        getParentIdsById(chArr[j][proCh], defaultProps)
      }
    }
  }
  var pLen = arr.length // 提高查询效率
  if (pLen == 1) {
    // 所有子元素共用一个父级
    parentIds.push(arr[0].id)
  }
  for (let j = 0; j < pLen; j++) {
    if (arr[j][proCh] && arr[j][proCh].length >= 0) {
      // 如果有子数组
      getParentIdsById(arr[j][proCh], defaultProps)
    }
  }
  parentIds = _.uniq(parentIds)
  return parentIds
}

/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = callback => {
  function listen (a) {
    callback(a)
  }
  document.addEventListener('fullscreenchange', function (a) {
    listen(a)
  })
  document.addEventListener('mozfullscreenchange', function (a) {
    listen(a)
  })
  document.addEventListener('webkitfullscreenchange', function (a) {
    listen(a)
  })
  document.addEventListener('msfullscreenchange', function (a) {
    listen(a)
  })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return (
    document.isFullScreen ||
    document.mozIsFullScreen ||
    document.webkitIsFullScreen
  )
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}
/**
 * 设置主题
 */
export const setTheme = name => {
  document.body.className = name
}

/**
 * 树转数组
 */
export const treeToArray = (
  data,
  expandAll,
  children,
  parent = null,
  level = null
) => {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record[children] && record[children].length > 0) {
      record.hasProgeniture = true // 添加属性 判断是否有子代
      const sub = treeToArray(
        record[children],
        expandAll,
        children,
        record,
        _level
      )
      tmp = tmp.concat(sub)
      delete record.children
      delete record.hasChildren
    }
  })
  // console.log(tmp)
  return tmp
}
/* 
日期转化为星期
*/
export const dateToWeek = val => {
  var tempData = new Date(val).getDay()
  var week = ''
  switch (tempData) {
    case 0:
      week = '星期日'
      break
    case 1:
      week = '星期一'
      break
    case 2:
      week = '星期二'
      break
    case 3:
      week = '星期三'
      break
    case 4:
      week = '星期四'
      break
    case 5:
      week = '星期五'
      break
    case 6:
      week = '星期六'
      break
    default:
      week = ''
      break
  }
  return week
}
