import * as actionTypes from './constants'

const initialState = {
  banners: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_BNNAERS:
      return { ...state, banners: action.banners }
    default:
      return state
  }
}

export default reducer
