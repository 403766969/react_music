import { actionTypes } from './constants'

import * as songsheetApi from '@/services/songsheetApi'
import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const set_songsheetDetail = songsheetDetail => ({
  type: actionTypes.SET_SONGSHEET_DETAIL,
  songsheetDetail: songsheetDetail
})

export const set_songList = songList => ({
  type: actionTypes.SET_SONG_LIST,
  songList: songList
})

export const set_hotComment = hotComment => ({
  type: actionTypes.SET_HOT_COMMENT,
  hotComment: hotComment
})

export const set_newComment = newComment => ({
  type: actionTypes.SET_NEW_COMMENT,
  newComment: newComment
})

export const set_relatedSongsheet = relatedSongsheet => ({
  type: actionTypes.SET_RELATED_SONGSHEET,
  relatedSongsheet: relatedSongsheet
})

/**
 * 异步请求
 */
// 歌单详情
export const get_songsheetDetail = songsheetId => {
  return async dispatch => {
    const res = await songsheetApi.get_playlist_detail(songsheetId)
    if (res && res.playlist) {
      dispatch(set_songsheetDetail(res.playlist))
      dispatch(get_songList(res.playlist.trackIds))
    }
  }
}

// 歌曲列表
export const get_songList = trackIds => {
  return async dispatch => {
    if (!trackIds) {
      return
    }
    const ids = trackIds.map(item => item.id).join(',')
    const res = await songApi.get_song_detail(ids)
    dispatch(set_songList(res.songs))
  }
}

// 热门评论
export const get_hotComment = (songsheetId, offset = 0, limit = 15) => {
  return async dispatch => {
    const res = await songsheetApi.get_comment_hot(songsheetId, offset, limit)
    if (!res || !res.hotComments) {
      return
    }
    const hotComment = {
      total: res.total,
      list: res.hotComments
    }
    dispatch(set_hotComment(hotComment))
  }
}

// 最新评论
export const get_newComment = (songsheetId, offset = 0, limit = 20) => {
  return async dispatch => {
    const res = await songsheetApi.get_comment_playlist(songsheetId, offset, limit)
    if (!res || !res.comments) {
      return
    }
    const newComment = {
      total: res.total,
      list: res.comments
    }
    dispatch(set_newComment(newComment))
  }
}

// 相关歌单
export const get_relatedSongsheet = songsheetId => {
  return async dispatch => {
    const res = await songsheetApi.get_related_playlist(songsheetId)
    if (res && res.playlists) {
      dispatch(set_relatedSongsheet(res.playlists))
    }
  }
}
