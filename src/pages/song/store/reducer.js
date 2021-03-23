import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  songDetail: null,
  songLyric: [],
  hotCommentList: [],
  newCommentList: [],
  newCommentCount: 0,
  simiSongsheetList: [],
  simiSongList: [],
  songDetailIsLoading: false
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_SONG_DETAIL:
      return state.set('songDetail', action.songDetail)
    case actionTypes.SET_SONG_LYRIC:
      return state.set('songLyric', action.songLyric)
    case actionTypes.SET_HOT_COMMENT_LIST:
      return state.set('hotCommentList', action.hotCommentList)
    case actionTypes.SET_NEW_COMMENT_LIST:
      return state.set('newCommentList', action.newCommentList)
    case actionTypes.SET_NEW_COMMENT_COUNT:
      return state.set('newCommentCount', action.newCommentCount)
    case actionTypes.SET_SIMI_SONGSHEET_LIST:
      return state.set('simiSongsheetList', action.simiSongsheetList)
    case actionTypes.SET_SIMI_SONG_LIST:
      return state.set('simiSongList', action.simiSongList)
    case actionTypes.SET_SONG_DETAIL_IS_LOADING:
      return state.set('songDetailIsLoading', action.songDetailIsLoading)
    default:
      return state
  }
}

export default reducer
