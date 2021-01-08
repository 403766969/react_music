import { Map } from 'immutable'

import * as actionTypes from './constants'

const initialState = Map({
  songInfo: {},
  simiPlaylist: [],
  simiSong: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SONG_INFO:
      return state.set('songInfo', action.songInfo)
    case actionTypes.SET_SIMI_PLAYLIST:
      return state.set('simiPlaylist', action.simiPlaylist)
    case actionTypes.SET_SIMI_SONG:
      return state.set('simiSong', action.simiSong)
    default:
      return state
  }
}

export default reducer
