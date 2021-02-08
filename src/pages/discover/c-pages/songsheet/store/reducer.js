import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  catList: []
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CAT_LIST:
      return state.set('catList', action.catList)
    default:
      return state
  }
}

export default reducer
