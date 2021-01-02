import { Map } from 'immutable'

import * as actionTypes from './constants'

const initialState = Map({
  banner: [],
  personalized: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BANNER:
      return state.set('banner', action.banner)
    case actionTypes.SET_PERSONALIZED:
      return state.set('personalized', action.personalized)
    default:
      return state
  }
}

export default reducer
