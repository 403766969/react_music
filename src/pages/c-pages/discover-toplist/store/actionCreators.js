import { actionTypes } from './constants'

import * as toplistApi from '@/services/toplistApi'
import * as songsheetApi from '@/services/songsheetApi'
import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const action_set_topCategories = topCategories => ({
  type: actionTypes.SET_TOP_CATEGORIES,
  topCategories: topCategories
})

export const action_set_currentTop = currentTop => ({
  type: actionTypes.SET_CURRENT_TOP,
  currentTop: currentTop
})
export const action_set_currentSongList = currentSongList => ({
  type: actionTypes.SET_CURRENT_SONG_LIST,
  currentSongList: currentSongList
})

/**
 * 异步请求
 */
export const action_get_topCategories = topId => {
  return async dispatch => {
    const res = await toplistApi.api_get_toplist()
    const top = res.list.find(item => item.id === topId) || res.list[0]
    dispatch(action_set_topCategories(res.list))
    if (top) {
      dispatch(action_set_currentTop(top))
      dispatch(action_get_currentSongList(top.id))
    }
  }
}

export const action_get_currentSongList = topId => {
  return async dispatch => {
    const pdRes = await songsheetApi.api_get_playlistDetail(topId)
    const ids = pdRes.playlist.trackIds.map(item => item.id).join(',')
    const sdRes = await songApi.api_get_songDetail(ids)
    dispatch(action_set_currentSongList(sdRes.songs))
  }
}

