import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  chartList: [],
  chartDetail: null,
  songList: [],
  hotCommentList: [],
  newCommentList: [],
  newCommentCount: 0,
  isLoading: false
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_CHART_LIST:
      return state.set('chartList', action.chartList)
    case actionTypes.SET_CHART_DETAIL:
      return state.set('chartDetail', action.chartDetail)
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_HOT_COMMENT_LIST:
      return state.set('hotCommentList', action.hotCommentList)
    case actionTypes.SET_NEW_COMMENT_LIST:
      return state.set('newCommentList', action.newCommentList)
    case actionTypes.SET_NEW_COMMENT_COUNT:
      return state.set('newCommentCount', action.newCommentCount)
    case actionTypes.SET_IS_LOADING:
      return state.set('isLoading', action.isLoading)
    default:
      return state
  }
}

export default reducer
