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
    const res = await songsheetApi.get_playlist_detail(chart.id)
    const chartDetail = {
      id: chart.id,
      name: res.playlist.name,
      updateTime: res.playlist.updateTime,
      updateFrequency: chart.updateFrequency,
      trackCount: res.playlist.trackCount,
      playCount: res.playlist.playCount,
      favorCount: res.playlist.subscribedCount,
      shareCount: res.playlist.shareCount,
      commentCount: res.playlist.commentCount,
      coverImgUrl: res.playlist.coverImgUrl,
      trackIds: res.playlist.trackIds
    }
    dispatch(set_currentChartDetail(chartDetail))
    dispatch(set_currentChartSongList([]))
    dispatch(get_currentChartSongList(chartDetail.trackIds))
  }
}

// 排行榜歌曲列表
export const get_currentChartSongList = trackIds => {
  return async dispatch => {
    const ids = trackIds.map(item => item.id).join(',')
    const res = await songApi.get_song_detail(ids)
    dispatch(set_currentChartSongList(res.songs))
  }
}

// 热门评论
export const get_hotComment = (offset = 0, limit = 15) => {
  return async (dispatch, getState) => {
    const chart = getState().getIn(['discover/toplist', 'currentChart'])
    const res = await songsheetApi.get_comment_hot(chart.id, offset, limit)
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
    const res = await songsheetApi.get_comment_playlist(chart.id, offset, limit)
    const newComment = {
      total: res.total,
      list: res.comments
    }
    dispatch(set_newComment(newComment))
  }
}
