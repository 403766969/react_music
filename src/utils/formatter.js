export function formatUrlWithSize(url, width = 0, height = width, direction = 'x') {
  return `${url}?param=${width}${direction}${height}`
}

export function formatCount(count, isInt = false) {
  if (count < 0) return
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    const temp = Math.floor(count / 1000) / 10
    return (isInt ? parseInt(temp) : temp) + '万'
  } else {
    const temp = Math.floor(count / 10000000) / 10
    return (isInt ? parseInt(temp) : temp) + '亿'
  }
}

export function formatDate(time, fmt) {
  let date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
