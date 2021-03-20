import { actionTypes } from './constants'

import * as djradioApi from '@/services/djradioApi'

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

export const set_cateList = cateList => ({
  type: actionTypes.SET_CATE_LIST,
  cateList: cateList
})

export const set_recomdRadioList = recomdRadioList => ({
  type: actionTypes.SET_RECOMD_RADIO_LIST,
  recomdRadioList: recomdRadioList
})

export const set_hotRadioList = hotRadioList => ({
  type: actionTypes.SET_HOT_RADIO_LIST,
  hotRadioList: hotRadioList
})

export const set_hotRadioCount = hotRadioCount => ({
  type: actionTypes.SET_HOT_RADIO_COUNT,
  hotRadioCount: hotRadioCount
})

/**
 * 异步请求
 */
// 电台分类
export const get_cateList = () => {
  return async dispatch => {
    const res = await djradioApi.get_dj_catelist()
    if (res && res.categories) {
      dispatch(set_cateList(res.categories))
    }
  }
}

// 推荐电台
export const get_recomdRadioList = type => {
  return async dispatch => {
    const res = await djradioApi.get_dj_recommend_type(type)
    if (res && res.djRadios) {
      dispatch(set_recomdRadioList(res.djRadios.slice(0, 5)))
    }
  }
}

// 热门电台
export const get_hotRadioList = (cateId, offset = 0, limit = 20) => {
  return async dispatch => {
    const res = await djradioApi.get_dj_radio_hot(cateId, offset, limit)
    if (res) {
      if (res.djRadios) {
        dispatch(set_hotRadioList(res.djRadios.slice(0, limit)))
      }
      if (res.count) {
        dispatch(set_hotRadioCount(res.count))
      }
    }
  }
}
