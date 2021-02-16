// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as DiscoverRecomd_Reducer } from '@/pages/c-pages/discover-recomd/store'
import { reducer as DiscoverToplist_Reducer } from '@/pages/c-pages/discover-toplist/store'
import { reducer as DiscoverSongsheet_Reducer } from '@/pages/c-pages/discover-songsheet/store'

import { reducer as Song_Reducer } from '@/pages/song/store'
import { reducer as Songsheet_Reducer } from '@/pages/songsheet/store'
import { reducer as Player_Reducer } from '@/pages/player/store'

const reducer = combineReducers({
  'discover/recomd': DiscoverRecomd_Reducer,
  'discover/toplist': DiscoverToplist_Reducer,
  'discover/songsheet': DiscoverSongsheet_Reducer,
  'song': Song_Reducer,
  'songsheet': Songsheet_Reducer,
  'player': Player_Reducer
})

export default reducer
