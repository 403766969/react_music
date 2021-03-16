// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as DiscoverRecomd_Reducer } from '@/pages/discover/c-pages/discover-recomd/store'
import { reducer as DiscoverToplist_Reducer } from '@/pages/discover/c-pages/discover-toplist/store'
import { reducer as DiscoverSongsheet_Reducer } from '@/pages/discover/c-pages/discover-songsheet/store'
import { reducer as DiscoverArtist_Reducer } from '@/pages/discover/c-pages/discover-artist/store'

import { reducer as Song_Reducer } from '@/pages/song/store'
import { reducer as Artist_Reducer } from '@/pages/artist/store'
import { reducer as Album_Reducer } from '@/pages/album/store'
import { reducer as Songsheet_Reducer } from '@/pages/songsheet/store'
import { reducer as Mv_Reducer } from '@/pages/mv/store'
import { reducer as Search_Reducer } from '@/pages/search/store'
import { reducer as Player_Reducer } from '@/pages/player/store'

const reducer = combineReducers({
  'discover/recomd': DiscoverRecomd_Reducer,
  'discover/toplist': DiscoverToplist_Reducer,
  'discover/songsheet': DiscoverSongsheet_Reducer,
  'discover/artist': DiscoverArtist_Reducer,
  'song': Song_Reducer,
  'artist': Artist_Reducer,
  'album': Album_Reducer,
  'songsheet': Songsheet_Reducer,
  'mv': Mv_Reducer,
  'search': Search_Reducer,
  'player': Player_Reducer
})

export default reducer
