import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  songsheetDetail: {},
  songList: [],
  hotComment: {},
  newComment: {},
  relatedSongsheet: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SONGSHEET_DETAIL:
      return state.set('songsheetDetail', action.songsheetDetail)
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_HOT_COMMENT:
      return state.set('hotComment', action.hotComment)
    case actionTypes.SET_NEW_COMMENT:
      return state.set('newComment', action.newComment)
    case actionTypes.SET_RELATED_SONGSHEET:
      return state.set('relatedSongsheet', action.relatedSongsheet)
    default:
      return state
  }
}

export default reducer
