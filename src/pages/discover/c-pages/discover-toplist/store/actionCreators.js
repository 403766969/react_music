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

export const set_chartList = chartList => ({
  type: actionTypes.SET_CHART_LIST,
  chartList: chartList
})

export const set_chartDetail = chartDetail => ({
  type: actionTypes.SET_CHART_DETAIL,
  chartDetail: chartDetail
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

export const set_isLoading = isLoading => ({
  type: actionTypes.SET_IS_LOADING,
  isLoading: isLoading
})

/**
 * 异步请求
 */
// 排行榜列表
export const get_chartList = () => {
  return async dispatch => {
    const res = await songsheetApi.get_toplist()
    if (res && res.list) {
      dispatch(set_chartList(res.list))
    }
  }
}

// 排行榜详情
export const get_chartDetail = chartId => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await songsheetApi.get_playlist_detail(chartId)
    if (res && res.playlist) {
      dispatch(set_chartDetail(res.playlist))
      dispatch(get_songList(res.playlist.trackIds))
    } else {
      dispatch(set_isLoading(false))
    }
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
    dispatch(set_isLoading(false))
  }
}

// 热门评论
export const get_hotCommentList = (chartId, offset = 0, limit = 15) => {
  return async dispatch => {
    const res = await songsheetApi.get_comment_hot(chartId, offset, limit)
    if (res && res.hotComments) {
      dispatch(set_hotCommentList(res.hotComments))
    }
  }
}

// 最新评论
export const get_newCommentList = (chartId, offset = 0, limit = 20) => {
  return async dispatch => {
    const res = await songsheetApi.get_comment_playlist(chartId, offset, limit)
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
