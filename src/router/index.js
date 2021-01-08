import { Redirect } from 'react-router-dom'

import Discover from '@/pages/discover'
import My from '@/pages/my'
import Friend from '@/pages/friend'
import Song from '@/pages/song'

import Recomd from '@/pages/discover/c-pages/recomd'
import Toplist from '@/pages/discover/c-pages/toplist'
import Playlist from '@/pages/discover/c-pages/playlist'
import Djradio from '@/pages/discover/c-pages/djradio'
import Artist from '@/pages/discover/c-pages/artist'
import Album from '@/pages/discover/c-pages/album'


const routes = [
  {
    path: '/',
    exact: true,
    render: () => (
      <Redirect to='/discover' />
    )
  },
  {
    path: '/discover',
    component: Discover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => (
          <Redirect to='/discover/recomd' />
        )
      },
      {
        path: '/discover/recomd',
        component: Recomd
      },
      {
        path: '/discover/toplist',
        component: Toplist
      },
      {
        path: '/discover/playlist',
        component: Playlist
      },
      {
        path: '/discover/djradio',
        component: Djradio
      },
      {
        path: '/discover/artist',
        component: Artist
      },
      {
        path: '/discover/album',
        component: Album
      }
    ]
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/friend',
    component: Friend
  },
  {
    path: '/song',
    component: Song
  }
]

export default routes
