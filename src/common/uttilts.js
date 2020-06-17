// 防抖函数
export function debounce(func, delay) {
  let timer = null

  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}

// 时间戳  正则表达式是干什么的？ 字符串匹配 利器
export function formatDate(date, fmt) {
    // y+ -> 1个或者多个y
    // y* -> 0个或者多个y
    // y? -> 0个或者1个y

  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }  //      拿到年份;  功能字符串; 截取
  // 获取
  // M+ -> 正则表达式中的一个规则-
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
