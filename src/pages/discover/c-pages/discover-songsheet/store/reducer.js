import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  catSubList: [],
  songsheetList: [],
  songsheetCount: 0
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_CAT_SUB_LIST:
      return state.set('catSubList', action.catSubList)
    case actionTypes.SET_SONGSHEET_LIST:
      return state.set('songsheetList', action.songsheetList)
    case actionTypes.SET_SONGSHEET_COUNT:
      return state.set('songsheetCount', action.songsheetCount)
    default:
      return state
  }
}

export default reducer
