import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  songList: [],
  lyricList: [],
  currentIndex: -1,
  currentRow: -1,
  audioStatus: '',
  messageConfig: null
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_LYRIC_LIST:
      return state.set('lyricList', action.lyricList)
    case actionTypes.SET_CURRENT_INDEX:
      return state.set('currentIndex', action.currentIndex)
    case actionTypes.SET_CURRENT_ROW:
      return state.set('currentRow', action.currentRow)
    case actionTypes.SET_AUDIO_STATUS:
      return state.set('audioStatus', action.audioStatus)
    case actionTypes.SET_MESSAGE_CONFIG:
      return state.set('messageConfig', action.messageConfig)
    default:
      return state
  }
}

export default reducer
