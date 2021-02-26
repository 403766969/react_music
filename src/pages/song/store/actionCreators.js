import { actionTypes } from './constants'

import { parseLyric, mergeLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const merge_state = state => ({
  type: actionTypes.MERGE_STATE,
  state: state
})

export const clear_state = () => ({
  type: actionTypes.CLEAR_STATE
})

export const set_songDetail = songDetail => ({
  type: actionTypes.SET_SONG_DETAIL,
  songDetail: songDetail
})

export const set_songLyric = songLyric => ({
  type: actionTypes.SET_SONG_LYRIC,
  songLyric: songLyric
})

export const set_hotCommentList = hotCommentList => ({
  type: actionTypes.SET_HOT_COMMENT_LIST,
  hotCommentList: hotCommentList
})

export const set_newCommentList = newCommentList => ({
  type: actionTypes.SET_NEW_COMMENT_LIST,
  newCommentList: newCommentList
})

export const set_newCommentCount = newCommentCount => ({
  type: actionTypes.SET_NEW_COMMENT_COUNT,
  newCommentCount: newCommentCount
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
    if (res && res.songs && res.songs[0]) {
      dispatch(set_songDetail(res.songs[0]))
    }
  }
}

// 歌词
export const get_songLyric = songId => {
  return async dispatch => {
    const res = await songApi.get_lyric(songId)
    let lyric = []
    if (!res) {
      lyric.push({ time: 0, content: '获取歌词失败' })
    } else if (res.nolyric) {
      lyric.push({ time: 0, content: '纯音乐，无歌词' })
    } else if (res.uncollected) {
      lyric.push({ time: 0, content: '暂无歌词' })
    } else {
      let ol = res.lrc && res.lrc.lyric
      let tl = res.tlyric && res.tlyric.lyric
      if (ol && tl) {
        lyric = mergeLyric(parseLyric(ol), parseLyric(tl))
      } else if (ol && !tl) {
        lyric = parseLyric(ol)
      } else if (!ol && tl) {
        lyric = parseLyric(tl)
      } else {
        lyric.push({ time: 0, content: '暂无歌词' })
      }
    }
    dispatch(set_songLyric(lyric))
  }
}

// 热门评论
export const get_hotCommentList = (songId, offset = 0, limit = 15) => {
  return async dispatch => {
    const res = await songApi.get_comment_hot(songId, offset, limit)
    if (res && res.hotComments) {
      dispatch(set_hotCommentList(res.hotComments))
    }
  }
}

// 最新评论
export const get_newCommentList = (songId, offset = 0, limit = 20) => {
  return async dispatch => {
    const res = await songApi.get_comment_music(songId, offset, limit)
    if (res) {
      if (res.comments) {
        dispatch(set_newCommentList(res.comments))
      }
      if (res.total) {
        dispatch(set_newCommentCount(res.total))
      }
    }
  }
}

// 相似歌单
export const get_simiSongsheetList = songId => {
  return async dispatch => {
    const res = await songApi.get_simi_playlist(songId)
    if (res && res.playlists) {
      dispatch(set_simiSongsheetList(res.playlists))
    }
  }
}

// 相似歌曲
export const get_simiSongList = songId => {
  return async dispatch => {
    const res = await songApi.get_simi_song(songId)
    if (res && res.songs) {
      dispatch(set_simiSongList(res.songs))
    }
  }
}
