import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  catList: [],
  currentCat: '',
  songsheetData: {}
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CAT_LIST:
      return state.set('catList', action.catList)
    case actionTypes.SET_CURRENT_CAT:
      return state.set('currentCat', action.currentCat)
    case actionTypes.SET_SONGSHEET_DATA:
      return state.set('songsheetData', action.songsheetData)
    default:
      return state
  }
}

export default reducer
