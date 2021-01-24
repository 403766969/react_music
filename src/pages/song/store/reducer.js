import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  songInfo: {},
  songLyric: [],
  simiSongsheet: [],
  simiSong: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SONG_INFO:
      return state.set('songInfo', action.songInfo)
    case actionTypes.SET_SONG_LYRIC:
      return state.set('songLyric', action.songLyric)
    case actionTypes.SET_SIMI_SONGSHEET:
      return state.set('simiSongsheet', action.simiSongsheet)
    case actionTypes.SET_SIMI_SONG:
      return state.set('simiSong', action.simiSong)
    default:
      return state
  }
}

export default reducer
