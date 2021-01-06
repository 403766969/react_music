// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as recomdReducer } from '@/pages/discover/c-pages/recomd/store'
import { reducer as playerReducer } from '@/pages/player/store'

const reducer = combineReducers({
  recomd: recomdReducer,
  player: playerReducer
})

export default reducer
