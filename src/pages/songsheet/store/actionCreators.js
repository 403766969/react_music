import { actionTypes } from './constants'

import * as songsheetApi from '@/services/songsheetApi'
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

export const set_songsheetDetail = songsheetDetail => ({
  type: actionTypes.SET_SONGSHEET_DETAIL,
  songsheetDetail: songsheetDetail
})

export const set_songList = songList => ({
  type: actionTypes.SET_SONG_LIST,
  songList: songList
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

export const set_relatedSongsheetList = relatedSongsheetList => ({
  type: actionTypes.SET_RELATED_SONGSHEET_LIST,
  relatedSongsheetList: relatedSongsheetList
})

export const set_songsheetDetailIsLoading = songsheetDetailIsLoading => ({
  type: actionTypes.SET_SONGSHEET_DETAIL_IS_LOADING,
  songsheetDetailIsLoading: songsheetDetailIsLoading
})

export const set_songListIsLoading = songListIsLoading => ({
  type: actionTypes.SET_SONG_LIST_IS_LOADING,
  songListIsLoading: songListIsLoading
})

/**
 * 异步请求
 */
// 歌单详情
export const get_songsheetDetail = songsheetId => {
  return async dispatch => {
    dispatch(set_songsheetDetailIsLoading(true))
    dispatch(set_songListIsLoading(true))
    const res = await songsheetApi.get_playlist_detail(songsheetId)
    if (res && res.playlist) {
      dispatch(set_songsheetDetail(res.playlist))
      dispatch(get_songList(res.playlist.trackIds))
    } else {
      dispatch(set_songListIsLoading(false))
    }
    dispatch(set_songsheetDetailIsLoading(false))
  }
}

// 歌曲列表
export const get_songList = trackIds => {
  return async dispatch => {
    const ids = trackIds.map(item => item.id).join(',')
    const res = await songApi.get_song_detail(ids)
    if (res && res.songs) {
      dispatch(set_songList(res.songs))
    }
    dispatch(set_songListIsLoading(false))
  }
}

// 热门评论
export const get_hotCommentList = (songsheetId, offset = 0, limit = 15) => {
  return async dispatch => {
    const res = await songsheetApi.get_comment_hot(songsheetId, offset, limit)
    if (res && res.hotComments) {
      dispatch(set_hotCommentList(res.hotComments))
    }
  }
}

// 最新评论
export const get_newCommentList = (songsheetId, offset = 0, limit = 20) => {
  return async dispatch => {
    const res = await songsheetApi.get_comment_playlist(songsheetId, offset, limit)
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

// 相关歌单
export const get_relatedSongsheetList = songsheetId => {
  return async dispatch => {
    const res = await songsheetApi.get_related_playlist(songsheetId)
    if (res && res.playlists) {
      dispatch(set_relatedSongsheetList(res.playlists))
    }
  }
}
