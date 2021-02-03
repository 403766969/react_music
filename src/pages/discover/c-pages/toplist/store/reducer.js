import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  topCategory: [],
  currentCategory: {}
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TOP_CATEGORY:
      return state.set('topCategory', action.topCategory)
    case actionTypes.SET_CURRENT_CATEGORY:
      return state.set('currentCategory', action.currentCategory)
    default:
      return state
  }
}

export default reducer
