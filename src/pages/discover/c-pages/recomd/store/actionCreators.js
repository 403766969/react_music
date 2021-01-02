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
