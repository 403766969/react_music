import { Map } from 'immutable'

import * as actionTypes from './constants'

const initialState = Map({
  showSong: {},
  songSongs: [],
  simiSong: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SHOW_SONG:
      return state.set('showSong', action.showSong)
    case actionTypes.SET_SONG_SONGS:
      return state.set('songSongs', action.songSongs)
    case actionTypes.SET_SIMI_SONG:
      return state.set('simiSong', action.simiSong)
    default:
      return state
  }
}

export default reducer
