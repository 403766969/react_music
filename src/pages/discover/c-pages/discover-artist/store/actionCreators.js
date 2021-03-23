import { actionTypes } from './constants'

import * as artistApi from '@/services/artistApi'

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

export const set_catTitle = catTitle => ({
  type: actionTypes.SET_CAT_TITLE,
  catTitle: catTitle
})

export const set_artistList = artistList => ({
  type: actionTypes.SET_ARTIST_LIST,
  artistList: artistList
})

export const set_artistListIsLoading = artistListIsLoading => ({
  type: actionTypes.SET_ARTIST_LIST_IS_LOADING,
  artistListIsLoading: artistListIsLoading
})

/**
 * 异步请求
 */
// 歌手列表
export const get_artistList = (area = '-1', type = '-1', initial = '-1', offset = 0, limit = 100) => {
  return async dispatch => {
    dispatch(set_artistListIsLoading(true))
    const res = await artistApi.get_artist_list(area, type, initial, offset, limit)
    if (res && res.artists) {
      dispatch(set_artistList(res.artists))
    }
    dispatch(set_artistListIsLoading(false))
  }
}
