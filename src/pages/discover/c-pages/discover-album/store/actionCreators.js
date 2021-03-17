import { actionTypes } from './constants'

import * as albumApi from '@/services/albumApi'

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

export const set_hotAlbumList = hotAlbumList => ({
  type: actionTypes.SET_HOT_ALBUM_LIST,
  hotAlbumList: hotAlbumList
})

export const set_allAlbumList = allAlbumList => ({
  type: actionTypes.SET_ALL_ALBUM_LIST,
  allAlbumList: allAlbumList
})

export const set_allAlbumCount = allAlbumCount => ({
  type: actionTypes.SET_ALL_ALBUM_COUNT,
  allAlbumCount: allAlbumCount
})

/**
 * 异步请求
 */
// 热门新碟
export const get_hotAlbumList = () => {
  return async dispatch => {
    const res = await albumApi.get_album_newest()
    if (res && res.albums) {
      dispatch(set_hotAlbumList(res.albums.slice(0, 10)))
    }
  }
}

// 全部新碟
export const get_allAlbumList = (area = 'ALL', offset = 0, limit = 35) => {
  return async dispatch => {
    const res = await albumApi.get_top_album(area, offset, limit)
    if (res) {
      if (res.albums) {
        dispatch(set_allAlbumList(res.albums))
      }
      if (res.total) {
        dispatch(set_allAlbumCount(res.total))
      }
    }
  }
}
