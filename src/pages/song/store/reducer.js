import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  songDetail: {},
  songLyric: [],
  simiSongsheetList: [],
  simiSongList: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SONG_DETAIL:
      return state.set('songDetail', action.songDetail)
    case actionTypes.SET_SONG_LYRIC:
      return state.set('songLyric', action.songLyric)
    case actionTypes.SET_SIMI_SONGSHEET_LIST:
      return state.set('simiSongsheetList', action.simiSongsheetList)
    case actionTypes.SET_SIMI_SONG_LIST:
      return state.set('simiSongList', action.simiSongList)
    default:
      return state
  }
}

export default reducer
