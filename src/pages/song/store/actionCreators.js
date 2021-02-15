import { actionTypes } from './constants'

import { parseLyric, mergeLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const set_songDetail = songDetail => ({
  type: actionTypes.SET_SONG_DETAIL,
  songDetail: songDetail
})

export const set_songLyric = songLyric => ({
  type: actionTypes.SET_SONG_LYRIC,
  songLyric: songLyric
})

export const set_hotComment = hotComment => ({
  type: actionTypes.SET_HOT_COMMENT,
  hotComment: hotComment
})

export const set_newComment = newComment => ({
  type: actionTypes.SET_NEW_COMMENT,
  newComment: newComment
})

export const set_simiSongsheetList = simiSongsheetList => ({
  type: actionTypes.SET_SIMI_SONGSHEET_LIST,
  simiSongsheetList: simiSongsheetList
})

export const set_simiSongList = simiSongList => ({
  type: actionTypes.SET_SIMI_SONG_LIST,
  simiSongList: simiSongList
})

/**
 * 异步请求
 */
// 歌曲详情
export const get_songDetail = songId => {
  return async dispatch => {
    const res = await songApi.get_song_detail(songId)
    dispatch(set_songDetail(res.songs[0]))
  }
}

// 歌词
export const get_songLyric = songId => {
  return async dispatch => {
    const res = await songApi.get_lyric(songId)
    let lyric = []
    if (res.nolyric) {
      lyric.push({ time: 0, content: '纯音乐，无歌词' })
    } else if (res.uncollected) {
      lyric.push({ time: 0, content: '暂时没有歌词' })
    } else if (res.lrc && res.tlyric) {
      const originalLyric = parseLyric(res.lrc.lyric)
      const translationLyric = parseLyric(res.tlyric.lyric)
      lyric = mergeLyric(originalLyric, translationLyric)
    } else if (res.lrc && !res.tlyric) {
      lyric = parseLyric(res.lrc.lyric)
    }
    dispatch(set_songLyric(lyric))
  }
}

// 热门评论
export const get_hotComment = (songId, offset = 0, limit = 15) => {
  return async dispatch => {
    const res = await songApi.get_comment_hot(songId, offset, limit)
    const hotComment = {
      total: res.total,
      list: res.hotComments
    }
    dispatch(set_hotComment(hotComment))
  }
}

// 最新评论
export const get_newComment = (songId, offset = 0, limit = 20) => {
  return async dispatch => {
    const res = await songApi.get_comment_music(songId, offset, limit)
    const newComment = {
      total: res.total,
      list: res.comments
    }
    dispatch(set_newComment(newComment))
  }
}

// 相似歌单
export const get_simiSongsheetList = songId => {
  return async dispatch => {
    const res = await songApi.get_simi_playlist(songId)
    dispatch(set_simiSongsheetList(res.playlists))
  }
}

// 相似歌曲
export const get_simiSongList = songId => {
  return async dispatch => {
    const res = await songApi.get_simi_song(songId)
    dispatch(set_simiSongList(res.songs))
  }
}
