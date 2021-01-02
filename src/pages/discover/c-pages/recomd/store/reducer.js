import { Map } from 'immutable'

import * as actionTypes from './constants'

const initialState = Map({
  banners: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_BNNAERS:
      return state.set('banners', action.banners)
    default:
      return state
  }
}

export default reducer
