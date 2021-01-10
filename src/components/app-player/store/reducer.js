import { Map } from 'immutable'

import { actionTypes } from './constants'
import { playModeConst } from '../app-player-bar/constants'


const initialState = Map({
  songList: [],
  currentSong: {},
  currentIndex: -1,
  playMode: playModeConst.LIST_LOOP,
  isInited: false
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', action.currentSong)
    case actionTypes.SET_CURRENT_INDEX:
      return state.set('currentIndex', action.currentIndex)
    case actionTypes.SET_PLAY_MODE:
      return state.set('playMode', action.playMode)
    case actionTypes.SET_IS_INITED:
      return state.set('isInited', action.isInited)
    default:
      return state
  }
}

export default reducer
