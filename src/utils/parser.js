import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { emojiUrl } from '@/common/constants'

// 解析歌曲字符串，返回歌词数组
export function parseLyric(lyricString) {
  const regExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  const regExpG = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g
  const rowArr = lyricString.split('\n')
  const lyric = []
  for (let row of rowArr) {
    if (!row) continue
    const matchArr = row.match(regExpG)
    if (!matchArr) continue
    const content = row.replace(regExpG, '').trim()
    for (let match of matchArr) {
      const result = regExp.exec(match)
      if (!result) continue
      const time1 = result[1] * 60 * 1000
      const time2 = result[2] * 1000
      const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10
      const time = time1 + time2 + time3
      const rowObj = { time, content }
      lyric.push(rowObj)
    }
  }
  lyric.sort((prev, next) => {
    return prev.time - next.time
  })
  return lyric
}

// 合并歌词原词和翻译
export function mergeLyric(originalLyric, translationLyric) {
  const lyric = []
  for (let i = 0, j = 0; i < originalLyric.length; i++) {
    const oi = originalLyric[i]
    const obj = {
      time: oi.time,
      content: oi.content,
      translation: ''
    }
    for (; j < translationLyric.length; j++) {
      const ti = translationLyric[j]
      if (oi.time === ti.time) {
        obj.translation = ti.content
        j++
        break
      } else if (oi.time < ti.time) {
        break
      }
    }
    lyric.push(obj)
  }
  return lyric
}

// 匹配字符串，并将匹配到的字符替换成对应内容，返回由匹配项分隔的元素数组
export function matchText(text, ...matchers) {
  if (!text || text === '') {
    return []
  }
  if (!matchers || matchers.length <= 0) {
    return [text]
  }

  for (let matcher of matchers) {
    if (matcher && matcher.regExp && matcher.replace) {
      let result = matcher.regExp.exec(text)
      if (result) {
        let prevText = text.slice(0, result.index)
        let nextText = text.slice(result.index + result[0].length, text.length)
        let replaceEl = matcher.replace(result[0])
        return [...matchText(prevText, ...matchers), replaceEl, ...matchText(nextText, ...matchers)]
      }
    }
  }

  return [text]
}

// 渲染元素数组
export const renderText = (text, ...matchers) => {
  return matchText(text, ...matchers).map((item, index) => {
    return (
      <Fragment key={index}>{item}</Fragment>
    )
  })
}

// 匹配换行
export const wrapMatcher = {
  regExp: /\n/,
  replace: function (match) {
    return (
      <br />
    )
  }
}

// 匹配@
export const atMatcher = {
  regExp: /@[^@\s]+/,
  replace: function (match) {
    return (
      <NavLink to={`/user/home?nickname=${match}`}>{match}</NavLink>
    )
  }
}

// 匹配emoji
export const emojiMatcher = {
  regExp: /\[\S+?\]/,
  replace: function (match) {
    const imgUrl = emojiUrl[match]
    return imgUrl
      ? <img src={imgUrl} alt={match} style={{ width: '21px', height: '21px' }} />
      : match
  }
}

// 匹配关键字
export const keywordsMatcher = keywords => {
  if (keywords) {
    return {
      regExp: new RegExp(keywords, 'i'),
      replace: function (match) {
        return (
          <span style={{ color: '#0c73c2' }}>{match}</span>
        )
      }
    }
  } else {
    return null
  }
}

// export function parseLyric(lyricString) {
//   const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
//   const rowArr = lyricString.split('\n')
//   const lyric = []
//   for (let row of rowArr) {
//     if (row) {
//       const result = parseExp.exec(row)
//       if (!result) continue
//       const time1 = result[1] * 60 * 1000
//       const time2 = result[2] * 1000
//       const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10
//       const time = time1 + time2 + time3
//       const content = row.replace(parseExp, '').trim()
//       const rowObj = { time, content }
//       lyric.push(rowObj)
//     }
//   }
//   lyric.sort((prev, next) => {
//     return prev.time - next.time
//   })
//   return lyric
// }

// export function matchText(text, ...matchers) {
//   if (!text || text === '') {
//     return []
//   }
//   if (!matchers || matchers.length <= 0) {
//     return [text]
//   }

//   let regExpString = matchers.reduce((prev, current) => {
//     if (current) {
//       let temp = current.regExp.toString()
//       return prev + '|' + temp.slice(1, temp.length - 1)
//     } else {
//       return prev
//     }
//   }, '')
//   regExpString = regExpString.slice(1, regExpString.length)

//   const regExp = new RegExp(regExpString, 'g')

//   const matchArr = text.match(regExp)
//   if (!matchArr || matchArr.length <= 0) {
//     return [text]
//   }

//   const splitArr = text.split(regExp)
//   const els = []
//   for (let i = 0; i < splitArr.length; i++) {
//     els.push(splitArr[i])
//     let match = matchArr[i]
//     if (match) {
//       for (let matcher of matchers) {
//         if (matcher && matcher.regExp.test(match)) {
//           els.push(matcher.replace(match))
//           break
//         }
//       }
//     }
//   }
//   return els
// }
