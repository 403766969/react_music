import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  mvDetail: null,
  mvUrl: '',
  hotCommentList: [],
  newCommentList: [],
  newCommentCount: 0,
  simiMvList: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_MV_DETAIL:
      return state.set('mvDetail', action.mvDetail)
    case actionTypes.SET_MV_URL:
      return state.set('mvUrl', action.mvUrl)
    case actionTypes.SET_HOT_COMMENT_LIST:
      return state.set('hotCommentList', action.hotCommentList)
    case actionTypes.SET_NEW_COMMENT_LIST:
      return state.set('newCommentList', action.newCommentList)
    case actionTypes.SET_NEW_COMMENT_COUNT:
      return state.set('newCommentCount', action.newCommentCount)
    case actionTypes.SET_SIMI_MV_LIST:
      return state.set('simiMvList', action.simiMvList)
    default:
      return state
  }
}

export default reducer
