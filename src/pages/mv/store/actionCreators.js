import { actionTypes } from './constants'

import * as mvApi from '@/services/mvApi'

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

export const set_mvDetail = mvDetail => ({
  type: actionTypes.SET_MV_DETAIL,
  mvDetail: mvDetail
})

export const set_mvUrl = mvUrl => ({
  type: actionTypes.SET_MV_URL,
  mvUrl: mvUrl
})

export const set_hotCommentList = hotCommentList => ({
  type: actionTypes.SET_HOT_COMMENT_LIST,
  hotCommentList: hotCommentList
})

export const set_newCommentList = newCommentList => ({
  type: actionTypes.SET_NEW_COMMENT_LIST,
  newCommentList: newCommentList
})

export const set_newCommentCount = newCommentCount => ({
  type: actionTypes.SET_NEW_COMMENT_COUNT,
  newCommentCount: newCommentCount
})

export const set_simiMvList = simiMvList => ({
  type: actionTypes.SET_SIMI_MV_LIST,
  simiMvList: simiMvList
})

export const set_mvDetailIsLoading = mvDetailIsLoading => ({
  type: actionTypes.SET_MV_DETAIL_IS_LOADING,
  mvDetailIsLoading: mvDetailIsLoading
})


/**
 * 异步请求
 */
// MV详情
export const get_mvDetail = mvId => {
  return async dispatch => {
    dispatch(set_mvDetailIsLoading(true))
    const res = await mvApi.get_mv_detail(mvId)
    if (res && res.data) {
      dispatch(set_mvDetail(res.data))
    }
    dispatch(set_mvDetailIsLoading(false))
  }
}

// MV地址
export const get_mvUrl = mvId => {
  return async dispatch => {
    const res = await mvApi.get_mv_url(mvId)
    if (res && res.data && res.data.url) {
      dispatch(set_mvUrl(res.data.url))
    }
  }
}

// 热门评论
export const get_hotCommentList = (mvId, offset = 0, limit = 15) => {
  return async dispatch => {
    const res = await mvApi.get_comment_hot(mvId, offset, limit)
    if (res && res.hotComments) {
      dispatch(set_hotCommentList(res.hotComments))
    }
  }
}

// 最新评论
export const get_newCommentList = (mvId, offset = 0, limit = 20) => {
  return async dispatch => {
    const res = await mvApi.get_comment_mv(mvId, offset, limit)
    if (res) {
      if (res.comments) {
        dispatch(set_newCommentList(res.comments))
      }
      if (res.total) {
        dispatch(set_newCommentCount(res.total))
      }
    }
  }
}

// 相似MV
export const get_simiMvList = mvId => {
  return async dispatch => {
    const res = await mvApi.get_simi_mv(mvId)
    if (res && res.mvs) {
      dispatch(set_simiMvList(res.mvs))
    }
  }
}
