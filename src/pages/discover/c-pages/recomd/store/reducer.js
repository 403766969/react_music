import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  carouselImages: [],
  hotRecomdList: [],
  newAlbumList: [],
  rankMultiList: [],
  settleSingerList: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CAROUSEL_IMAGES:
      return state.set('carouselImages', action.carouselImages)
    case actionTypes.SET_HOT_RECOMD_LIST:
      return state.set('hotRecomdList', action.hotRecomdList)
    case actionTypes.SET_NEW_ALBUM_LIST:
      return state.set('newAlbumList', action.newAlbumList)
    case actionTypes.SET_RANK_MULTI_LIST:
      return state.set('rankMultiList', action.rankMultiList)
    case actionTypes.SET_SETTLE_SINGER_LIST:
      return state.set('settleSingerList', action.settleSingerList)
    default:
      return state
  }
}

export default reducer
