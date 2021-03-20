import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  cateList: [],
  recomdRadioList: [],
  hotRadioList: [],
  hotRadioCount: 0
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_STATE:
      return state.merge(action.state)
    case actionTypes.CLEAR_STATE:
      return state.clear()
    case actionTypes.SET_CATE_LIST:
      return state.set('cateList', action.cateList)
    case actionTypes.SET_RECOMD_RADIO_LIST:
      return state.set('recomdRadioList', action.recomdRadioList)
    case actionTypes.SET_HOT_RADIO_LIST:
      return state.set('hotRadioList', action.hotRadioList)
    case actionTypes.SET_HOT_RADIO_COUNT:
      return state.set('hotRadioCount', action.hotRadioCount)
    default:
      return state
  }
}

export default reducer
