import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  baseInfo: null,
  descInfo: null,
  songList: [],
  songCount: 0,
  albumList: [],
  albumCount: 0,
  mvList: [],
  mvCount: 0
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_BASE_INFO:
      return state.set('baseInfo', action.baseInfo)
    case actionTypes.SET_DESC_INFO:
      return state.set('descInfo', action.descInfo)
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_SONG_COUNT:
      return state.set('songCount', action.songCount)
    case actionTypes.SET_ALBUM_LIST:
      return state.set('albumList', action.albumList)
    case actionTypes.SET_ALBUM_COUNT:
      return state.set('albumCount', action.albumCount)
    case actionTypes.SET_MV_LIST:
      return state.set('mvList', action.mvList)
    case actionTypes.SET_MV_COUNT:
      return state.set('mvCount', action.mvCount)
    default:
      return state
  }
}

export default reducer
