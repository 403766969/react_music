export function parseLyric(lyricString) {
  const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  const rowArr = lyricString.split('\n')
  const lyric = []
  for (let row of rowArr) {
    if (row) {
      const result = parseExp.exec(row)
      if (!result) continue
      const time1 = result[1] * 60 * 1000
      const time2 = result[2] * 1000
      const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10
      const time = time1 + time2 + time3
      const content = row.replace(parseExp, '').trim()
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
