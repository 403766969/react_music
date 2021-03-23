import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  catTitle: '',
  artistList: [],
  artistListIsLoading: false
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_CAT_TITLE:
      return state.set('catTitle', action.catTitle)
    case actionTypes.SET_ARTIST_LIST:
      return state.set('artistList', action.artistList)
    case actionTypes.SET_ARTIST_LIST_IS_LOADING:
      return state.set('artistListIsLoading', action.artistListIsLoading)
    default:
      return state
  }
}

export default reducer
