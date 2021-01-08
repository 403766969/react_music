// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as playerReducer } from '@/components/app-player/store'
import { reducer as recomdReducer } from '@/pages/discover/c-pages/recomd/store'
import { reducer as songReducer } from '@/pages/song/store'

const reducer = combineReducers({
  player: playerReducer,
  recomd: recomdReducer,
  song: songReducer
})

export default reducer
