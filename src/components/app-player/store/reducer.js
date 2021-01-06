import { Map } from 'immutable'

import * as actionTypes from './constants'

export const initialState = Map({
  currentSong: {}
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', action.currentSong)
    default:
      return state
  }
}

export default reducer
