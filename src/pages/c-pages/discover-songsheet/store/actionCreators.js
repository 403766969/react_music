import { actionTypes } from './constants'

import * as songsheetApi from '@/services/songsheetApi'

/**
 * 操作state
 */
export const action_set_catList = catList => ({
  type: actionTypes.SET_CAT_LIST,
  catList: catList
})

export const action_set_currentCat = currentCat => ({
  type: actionTypes.SET_CURRENT_CAT,
  currentCat: currentCat
})

export const action_set_songsheetData = songsheetData => ({
  type: actionTypes.SET_SONGSHEET_DATA,
  songsheetData: songsheetData
})

/**
 * 异步请求
 */
export const action_get_catList = () => {
  return async dispatch => {
    const res = await songsheetApi.api_get_playlistCatlist()
    const catlist = []
    Object.entries(res.categories).forEach(item => {
      catlist[item[0]] = {
        name: item[1],
        subs: []
      }
    })
    for (let item of res.sub) {
      catlist[item.category].subs.push(item)
    }
    dispatch(action_set_catList(catlist))
  }
}

export const action_get_songsheetData = (offset = 0, limit = 35, order = 'hot') => {
  return async (dispatch, getState) => {
    const currentCat = getState().getIn(['discover/songsheet', 'currentCat'])
    const res = await songsheetApi.api_get_topPlaylist(currentCat, offset, limit, order)
    dispatch(action_set_songsheetData(res))
  }
}
