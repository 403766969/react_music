import { Map } from 'immutable'

import { actionTypes } from './constants'


const initialState = Map({
  songList: [],
  currentSong: {},
  currentSongIndex: -1,
  currentLyric: [],
  currentLyricIndex: -1,
  isInited: false
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', action.currentSong)
    case actionTypes.SET_CURRENT_SONG_INDEX:
      return state.set('currentSongIndex', action.currentSongIndex)
    case actionTypes.SET_CURRENT_LYRIC:
      return state.set('currentLyric', action.currentLyric)
    case actionTypes.SET_CURRENT_LYRIC_INDEX:
      return state.set('currentLyricIndex', action.currentLyricIndex)
    case actionTypes.SET_IS_INITED:
      return state.set('isInited', action.isInited)
    default:
      return state
  }
}

export default reducer
