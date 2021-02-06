import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  topCategories: [],
  currentTop: {},
  currentSongList: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TOP_CATEGORIES:
      return state.set('topCategories', action.topCategories)
    case actionTypes.SET_CURRENT_TOP:
      return state.set('currentTop', action.currentTop)
    case actionTypes.SET_CURRENT_SONG_LIST:
      return state.set('currentSongList', action.currentSongList)
    default:
      return state
  }
}

export default reducer
