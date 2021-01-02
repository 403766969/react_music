import * as actionTypes from './constants'

import * as recommendationApi from '@/services/recommendationApi'

export const changeBannersAction = banners => ({
  type: actionTypes.CHANGE_BNNAERS,
  banners: banners
})

export const getBannersAction = () => {
  return async dispatch => {
    const res = await recommendationApi.getBannersApi()
    dispatch(changeBannersAction(res.banners))
  }
}
