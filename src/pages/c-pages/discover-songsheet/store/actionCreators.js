import { actionTypes } from './constants'

import * as songsheetApi from '@/services/songsheetApi'

/**
 * 操作state
 */
export const set_catList = catList => ({
  type: actionTypes.SET_CAT_LIST,
  catList: catList
})

export const set_currentSub = currentSub => ({
  type: actionTypes.SET_CURRENT_SUB,
  currentSub: currentSub
})

export const set_songsheetData = songsheetData => ({
  type: actionTypes.SET_SONGSHEET_DATA,
  songsheetData: songsheetData
})

/**
 * 异步请求
 */
// 歌单分类
export const get_catList = sub => {
  return async dispatch => {
    const res = await songsheetApi.get_playlist_catlist()
    const catlist = []
    Object.entries(res.categories).forEach(([key, value]) => {
      catlist[key] = {
        name: value,
        subs: []
      }
    })
    let targetSub = '全部'
    for (let item of res.sub) {
      catlist[item.category].subs.push(item.name)
      if (item.name === sub) {
        targetSub = item.name
      }
    }
    dispatch(set_catList(catlist))
    dispatch(set_currentSub(targetSub))
    dispatch(get_songsheetData(0, 35, 'hot'))
  }
}

// 歌单列表
export const get_songsheetData = (offset = 0, limit = 35, order = 'hot') => {
  return async (dispatch, getState) => {
    const sub = getState().getIn(['discover/songsheet', 'currentSub'])
    const res = await songsheetApi.get_top_playlist(sub, offset, limit, order)
    dispatch(set_songsheetData(res))
  }
}
