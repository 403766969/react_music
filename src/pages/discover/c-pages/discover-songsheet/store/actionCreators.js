import { actionTypes } from './constants'

import * as songsheetApi from '@/services/songsheetApi'

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

export const set_catSubList = catSubList => ({
  type: actionTypes.SET_CAT_SUB_LIST,
  catSubList: catSubList
})

export const set_songsheetList = songsheetList => ({
  type: actionTypes.SET_SONGSHEET_LIST,
  songsheetList: songsheetList
})

export const set_songsheetCount = songsheetCount => ({
  type: actionTypes.SET_SONGSHEET_COUNT,
  songsheetCount: songsheetCount
})

/**
 * 异步请求
 */
// 歌单分类
export const get_catSubList = () => {
  return async dispatch => {
    const res = await songsheetApi.get_playlist_catlist()
    const catSubList = []
    if (res && res.categories && res.sub) {
      Object.entries(res.categories).forEach(([key, value]) => {
        catSubList[key] = {
          name: value,
          subs: []
        }
      })
      for (let item of res.sub) {
        catSubList[item.category].subs.push(item.name)
      }
      dispatch(set_catSubList(catSubList))
    }
  }
}

// 歌单列表
export const get_songsheetList = (sub = '全部', order = 'hot', offset = 0, limit = 35) => {
  return async dispatch => {
    const res = await songsheetApi.get_top_playlist(sub, order, offset, limit)
    if (res && res.playlists) {
      dispatch(set_songsheetList(res.playlists))
    }
    if (res && res.total) {
      dispatch(set_songsheetCount(res.total))
    }
  }
}
