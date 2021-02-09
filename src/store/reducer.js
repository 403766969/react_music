// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as DiscoverRecomd_reducer } from '@/pages/c-pages/discover-recomd/store'
import { reducer as DiscoverToplist_reducer } from '@/pages/c-pages/discover-toplist/store'
import { reducer as DiscoverSongsheet_reducer } from '@/pages/c-pages/discover-songsheet/store'

import { reducer as songReducer } from '@/pages/song/store'
import { reducer as playerReducer } from '@/pages/player/store'

const reducer = combineReducers({
  'discover/recomd': DiscoverRecomd_reducer,
  'discover/toplist': DiscoverToplist_reducer,
  'discover/songsheet': DiscoverSongsheet_reducer,
  'song': songReducer,
  'player': playerReducer
})

export default reducer
