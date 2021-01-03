import * as actionTypes from './constants'

import * as recomdApi from '@/services/recomdApi'

export const setBannerAction = banner => ({
  type: actionTypes.SET_BANNER,
  banner: banner
})

export const setPersonalizedAction = personalized => ({
  type: actionTypes.SET_PERSONALIZED,
  personalized: personalized
})

export const setTopAlbumAction = topAlbum => ({
  type: actionTypes.SET_TOP_ALBUM,
  topAlbum: topAlbum
})

export const setTopListUpAction = topListUp => ({
  type: actionTypes.SET_TOP_LIST_UP,
  topListUp: topListUp
})

export const setTopListNewAction = topListNew => ({
  type: actionTypes.SET_TOP_LIST_NEW,
  topListNew: topListNew
})

export const setTopListOrgAction = topListOrg => ({
  type: actionTypes.SET_TOP_LIST_ORG,
  topListOrg: topListOrg
})

export const getBannerAction = () => {
  return async dispatch => {
    const res = await recomdApi.getBannerApi()
    dispatch(setBannerAction(res.banners))
  }
}

export const getPersonalizedAction = limit => {
  return async dispatch => {
    const res = await recomdApi.getPersonalizedApi(limit)
    dispatch(setPersonalizedAction(res.result))
  }
}

export const getTopAlbumAction = (limit, offset) => {
  return async dispatch => {
    const res = await recomdApi.getTopAlbumApi(limit, offset)
    dispatch(setTopAlbumAction(res.albums))
  }
}

export const getTopListAction = idx => {
  return async dispatch => {
    const res = await recomdApi.getTopListApi(idx)
    switch (idx) {
      case 0:
        dispatch(setTopListNewAction(res.playlist))
        break
      case 2:
        dispatch(setTopListOrgAction(res.playlist))
        break
      case 3:
        dispatch(setTopListUpAction(res.playlist))
        break
      default:
        console.log('其他榜单', res.playlist)
    }
  }
}
