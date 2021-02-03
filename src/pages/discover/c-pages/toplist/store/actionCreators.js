import { actionTypes } from './constants'

import * as toplistApi from '@/services/toplistApi'

/**
 * 操作state
 */
export const action_set_topCategory = topCategory => ({
  type: actionTypes.SET_TOP_CATEGORY,
  topCategory: topCategory
})

export const action_set_currentCategory = currentCategory => ({
  type: actionTypes.SET_CURRENT_CATEGORY,
  currentCategory: currentCategory
})

/**
 * 异步请求
 */
export const action_get_topCategory = () => {
  return async dispatch => {
    const res = await toplistApi.api_get_toplist()
    dispatch(action_set_topCategory(res.list))
    dispatch(action_set_currentCategory(res.list[0]))
  }
}
