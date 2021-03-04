import { NavLink } from 'react-router-dom'

import { emojiUrl } from '@/common/constants'

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

export function matchText(text, ...matchers) {
  if (!text || text === '') {
    return []
  }
  if (!matchers || matchers.length <= 0) {
    return [text]
  }

  let regExpString = matchers.reduce((prev, current) => {
    if (current) {
      let temp = current.regExp.toString()
      return prev + '|' + temp.slice(1, temp.length - 1)
    } else {
      return prev
    }
  }, '')
  regExpString = regExpString.slice(1, regExpString.length)

  const regExp = new RegExp(regExpString, 'g')

  const matchArr = text.match(regExp)
  if (!matchArr || matchArr.length <= 0) {
    return [text]
  }

  const splitArr = text.split(regExp)
  const els = []
  for (let i = 0; i < splitArr.length; i++) {
    els.push(splitArr[i])
    let match = matchArr[i]
    if (match) {
      for (let matcher of matchers) {
        if (matcher && matcher.regExp.test(match)) {
          els.push(matcher.replace(match))
          break
        }
      }
    }
  }
  return els
}

export const wrapMatcher = {
  regExp: /\n/,
  replace: function (match) {
    return (
      <br />
    )
  }
}

export const atMatcher = {
  regExp: /@[^@\s]+/,
  replace: function (match) {
    return (
      <NavLink to={`/user/home?nickname=${match}`}>{match}</NavLink>
    )
  }
}

export const emojiMatcher = {
  regExp: /\[\S+?\]/,
  replace: function (match) {
    const imgUrl = emojiUrl[match]
    return imgUrl
      ? <img src={imgUrl} alt={match} style={{ width: '21px', height: '21px' }} />
      : match
  }
}
