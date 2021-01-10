import { actionTypes } from './constants'

import * as recomdApi from '@/services/recomdApi'

/**
 * 操作state
 */
export const action_set_carouselImages = carouselImages => ({
  type: actionTypes.SET_CAROUSEL_IMAGES,
  carouselImages: carouselImages
})

export const action_set_hotRecomdList = hotRecomdList => ({
  type: actionTypes.SET_HOT_RECOMD_LIST,
  hotRecomdList: hotRecomdList
})

export const action_set_newAlbumList = newAlbumList => ({
  type: actionTypes.SET_NEW_ALBUM_LIST,
  newAlbumList: newAlbumList
})

export const action_set_rankMultiUp = rankMultiUp => ({
  type: actionTypes.SET_RANK_MULTI_UP,
  rankMultiUp: rankMultiUp
})

export const action_set_rankMultiNew = rankMultiNew => ({
  type: actionTypes.SET_RANK_MULTI_NEW,
  rankMultiNew: rankMultiNew
})

export const action_set_rankMultiOrg = rankMultiOrg => ({
  type: actionTypes.SET_RANK_MULTI_ORG,
  rankMultiOrg: rankMultiOrg
})

export const action_set_settleSingerList = settleSingerList => ({
  type: actionTypes.SET_SETTLE_SINGER_LIST,
  settleSingerList: settleSingerList
})

/**
 * 异步请求
 */
export const action_get_carouselImages = () => {
  return async dispatch => {
    const res = await recomdApi.api_get_banner()
    dispatch(action_set_carouselImages(res.banners))
  }
}

export const action_get_hotRecomdList = limit => {
  return async dispatch => {
    const res = await recomdApi.api_get_personalized(limit)
    dispatch(action_set_hotRecomdList(res.result))
  }
}

export const action_get_newAlbumList = (limit, offset) => {
  return async dispatch => {
    const res = await recomdApi.api_get_topAlbum(limit, offset)
    dispatch(action_set_newAlbumList(res.albums))
  }
}

export const action_get_rankMulti = idx => {
  return async dispatch => {
    const res = await recomdApi.api_get_topList(idx)
    switch (idx) {
      case 0:
        dispatch(action_set_rankMultiNew(res.playlist))
        break
      case 2:
        dispatch(action_set_rankMultiOrg(res.playlist))
        break
      case 3:
        dispatch(action_set_rankMultiUp(res.playlist))
        break
      default:
        console.log('其他榜单', res.playlist)
    }
  }
}

export const action_get_settleSingerList = (cat, limit) => {
  return async dispatch => {
    const res = await recomdApi.api_get_artistList(cat, limit)
    dispatch(action_set_settleSingerList(res.artists))
  }
}
