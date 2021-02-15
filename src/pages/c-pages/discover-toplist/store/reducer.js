import { Map } from 'immutable'

import { actionTypes } from './constants'

const initialState = Map({
  chartList: [],
  currentChart: {},
  currentChartDetail: {},
  currentChartSongList: [],
  hotComment: {},
  newComment: {}
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CHART_LIST:
      return state.set('chartList', action.chartList)
    case actionTypes.SET_CURRENT_CHART:
      return state.set('currentChart', action.currentChart)
    case actionTypes.SET_CURRENT_CHART_DETAIL:
      return state.set('currentChartDetail', action.currentChartDetail)
    case actionTypes.SET_CURRENT_CHART_SONG_LIST:
      return state.set('currentChartSongList', action.currentChartSongList)
    case actionTypes.SET_HOT_COMMENT:
      return state.set('hotComment', action.hotComment)
    case actionTypes.SET_NEW_COMMENT:
      return state.set('newComment', action.newComment)
    default:
      return state
  }
}

export default reducer
