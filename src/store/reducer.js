// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as recomdReducer } from '@/pages/discover/c-pages/recomd/store'
import { reducer as toplistReducer } from '@/pages/discover/c-pages/toplist/store'
import { reducer as songReducer } from '@/pages/song/store'
import { reducer as playerReducer } from '@/pages/player/store'

const reducer = combineReducers({
  toplist: toplistReducer,
  recomd: recomdReducer,
  song: songReducer,
  player: playerReducer
})

export default reducer
