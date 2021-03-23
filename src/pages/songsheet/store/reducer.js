import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  songsheetDetail: null,
  songList: [],
  hotCommentList: [],
  newCommentList: [],
  newCommentCount: 0,
  relatedSongsheetList: [],
  songsheetDetailIsLoading: false,
  songListIsLoading: false
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_SONGSHEET_DETAIL:
      return state.set('songsheetDetail', action.songsheetDetail)
    case actionTypes.SET_SONG_LIST:
      return state.set('songList', action.songList)
    case actionTypes.SET_HOT_COMMENT_LIST:
      return state.set('hotCommentList', action.hotCommentList)
    case actionTypes.SET_NEW_COMMENT_LIST:
      return state.set('newCommentList', action.newCommentList)
    case actionTypes.SET_NEW_COMMENT_COUNT:
      return state.set('newCommentCount', action.newCommentCount)
    case actionTypes.SET_RELATED_SONGSHEET_LIST:
      return state.set('relatedSongsheetList', action.relatedSongsheetList)
    case actionTypes.SET_SONGSHEET_DETAIL_IS_LOADING:
      return state.set('songsheetDetailIsLoading', action.songsheetDetailIsLoading)
    case actionTypes.SET_SONG_LIST_IS_LOADING:
      return state.set('songListIsLoading', action.songListIsLoading)
    default:
      return state
  }
}

export default reducer
