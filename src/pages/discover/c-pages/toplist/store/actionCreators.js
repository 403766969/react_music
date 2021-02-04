import { actionTypes } from './constants'

import * as toplistApi from '@/services/toplistApi'

/**
 * 操作state
 */
export const action_set_topCategories = topCategories => ({
  type: actionTypes.SET_TOP_CATEGORIES,
  topCategories: topCategories
})

export const action_set_currentCategory = currentCategory => ({
  type: actionTypes.SET_CURRENT_CATEGORY,
  currentCategory: currentCategory
})

/**
 * 异步请求
 */
export const action_get_topCategories = topCategoryId => {
  return async dispatch => {
    const res = await toplistApi.api_get_toplist()
    const categories = res.list
    const category = res.list.find(item => item.id === topCategoryId) || res.list[0] || {}
    dispatch(action_set_topCategories(categories))
    dispatch(action_set_currentCategory(category))
  }
}
