import { Map } from 'immutable'

import * as actionTypes from './constants'

const initialState = Map({
  banner: [],
  personalized: [],
  topAlbum: [],
  topListUp: [],
  topListNew: [],
  topListOrg: [],
  artistList: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BANNER:
      return state.set('banner', action.banner)
    case actionTypes.SET_PERSONALIZED:
      return state.set('personalized', action.personalized)
    case actionTypes.SET_TOP_ALBUM:
      return state.set('topAlbum', action.topAlbum)
    case actionTypes.SET_TOP_LIST_UP:
      return state.set('topListUp', action.topListUp)
    case actionTypes.SET_TOP_LIST_NEW:
      return state.set('topListNew', action.topListNew)
    case actionTypes.SET_TOP_LIST_ORG:
      return state.set('topListOrg', action.topListOrg)
    case actionTypes.SET_ARTIST_LIST:
      return state.set('artistList', action.artistList)
    default:
      return state
  }
}

export default reducer
