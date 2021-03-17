import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  hotAlbumList: [],
  allAlbumList: [],
  allAlbumCount: 0
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_HOT_ALBUM_LIST:
      return state.set('hotAlbumList', action.hotAlbumList)
    case actionTypes.SET_ALL_ALBUM_LIST:
      return state.set('allAlbumList', action.allAlbumList)
    case actionTypes.SET_ALL_ALBUM_COUNT:
      return state.set('allAlbumCount', action.allAlbumCount)
    default:
      return state
  }
}

export default reducer
