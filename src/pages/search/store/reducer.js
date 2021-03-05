import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  songList: [],
  songCount: 0,
  songsheetList: [],
  songsheetCount: 0,
  artistList: [],
  artistCount: 0,
  searchSuggest: null
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_SONG_COUNT:
      return state.set('songCount', action.songCount)
    case actionTypes.SET_SONGSHEET_LIST:
      return state.set('songsheetList', action.songsheetList)
    case actionTypes.SET_SONGSHEET_COUNT:
      return state.set('songsheetCount', action.songsheetCount)
    case actionTypes.SET_ARTIST_LIST:
      return state.set('artistList', action.artistList)
    case actionTypes.SET_ARTIST_COUNT:
      return state.set('artistCount', action.artistCount)
    case actionTypes.SET_SEARCH_SUGGEST:
      return state.set('searchSuggest', action.searchSuggest)
    default:
      return state
  }
}

export default reducer
