import { actionTypes } from './constants'

import * as songsheetApi from '@/services/songsheetApi'
import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const set_chartList = chartList => ({
  type: actionTypes.SET_CHART_LIST,
  chartList: chartList
})

export const set_currentChart = currentChart => ({
  type: actionTypes.SET_CURRENT_CHART,
  currentChart: currentChart
})

export const set_currentChartDetail = currentChartDetail => ({
  type: actionTypes.SET_CURRENT_CHART_DETAIL,
  currentChartDetail: currentChartDetail
})

export const set_currentChartSongList = currentChartSongList => ({
  type: actionTypes.SET_CURRENT_CHART_SONG_LIST,
  currentChartSongList: currentChartSongList
})

export const set_hotComment = hotComment => ({
  type: actionTypes.SET_HOT_COMMENT,
  hotComment: hotComment
})

export const set_newComment = newComment => ({
  type: actionTypes.SET_NEW_COMMENT,
  newComment: newComment
})

/**
 * 异步请求
 */
// 排行榜列表
export const get_chartList = chartId => {
  return async dispatch => {
    const res = await songsheetApi.get_toplist()
    if (!res || !res.list || res.list.length <= 0) {
      return
    }
    const chart = res.list.find(item => item.id === chartId) || res.list[0] || {}
    dispatch(set_chartList(res.list))
    dispatch(set_currentChart(chart))
    dispatch(get_currentChartDetail())
    dispatch(get_hotComment(0, 15))
    dispatch(get_newComment(0, 20))
  }
}

// 排行榜详情
export const get_currentChartDetail = () => {
  return async (dispatch, getState) => {
    const chart = getState().getIn(['discover/toplist', 'currentChart'])
    if (!chart || !chart.id) {
      return
    }
    const res = await songsheetApi.get_playlist_detail(chart.id)
    if (!res || !res.playlist) {
      return
    }
    res.playlist.updateFrequency = chart.updateFrequency
    dispatch(set_currentChartDetail(res.playlist))
    dispatch(set_currentChartSongList([]))
    dispatch(get_currentChartSongList(res.playlist.trackIds))
  }
}

// 排行榜歌曲列表
export const get_currentChartSongList = trackIds => {
  return async dispatch => {
    if (!trackIds) {
      return
    }
    const ids = trackIds.map(item => item.id).join(',')
    const res = await songApi.get_song_detail(ids)
    if (res && res.songs) {
      dispatch(set_currentChartSongList(res.songs))
    }
  }
}

// 热门评论
export const get_hotComment = (offset = 0, limit = 15) => {
  return async (dispatch, getState) => {
    const chart = getState().getIn(['discover/toplist', 'currentChart'])
    if (!chart || !chart.id) {
      return
    }
    const res = await songsheetApi.get_comment_hot(chart.id, offset, limit)
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
export const get_newComment = (offset = 0, limit = 20) => {
  return async (dispatch, getState) => {
    const chart = getState().getIn(['discover/toplist', 'currentChart'])
    if (!chart || !chart.id) {
      return
    }
    const res = await songsheetApi.get_comment_playlist(chart.id, offset, limit)
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
