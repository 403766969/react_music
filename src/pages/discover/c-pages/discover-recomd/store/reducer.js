import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  topBannerList: [],
  hotRecomdList: [],
  newAlbumList: [],
  rankMultiList: [],
  hotArtistList: [],
  rankMultiListIsLoading: false
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_TOP_BANNER_LIST:
      return state.set('topBannerList', action.topBannerList)
    case actionTypes.SET_HOT_RECOMD_LIST:
      return state.set('hotRecomdList', action.hotRecomdList)
    case actionTypes.SET_NEW_ALBUM_LIST:
      return state.set('newAlbumList', action.newAlbumList)
    case actionTypes.SET_RANK_MULTI_LIST:
      return state.set('rankMultiList', action.rankMultiList)
    case actionTypes.SET_HOT_ARTIST_LIST:
      return state.set('hotArtistList', action.hotArtistList)
    case actionTypes.SET_RANK_MULTI_LIST_IS_LOADING:
      return state.set('rankMultiListIsLoading', action.rankMultiListIsLoading)
    default:
      return state
  }
}

export default reducer
