import { Redirect } from 'react-router-dom'

import Discover from '@/pages/discover'
import Mine from '@/pages/mine'
import Friend from '@/pages/friend'

import Recommendation from '@/pages/discover/c-pages/recommendation'
import Toplist from '@/pages/discover/c-pages/toplist'
import Playlist from '@/pages/discover/c-pages/playlist'
import Djradio from '@/pages/discover/c-pages/djradio'
import Artist from '@/pages/discover/c-pages/artist'
import Album from '@/pages/discover/c-pages/album'


const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover" />
    )
  },
  {
    path: "/discover",
    component: Discover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommendation" />
        )
      },
      {
        path: "/discover/recommendation",
        component: Recommendation
      },
      {
        path: "/discover/toplist",
        component: Toplist
      },
      {
        path: "/discover/playlist",
        component: Playlist
      },
      {
        path: "/discover/djradio",
        component: Djradio
      },
      {
        path: "/discover/artist",
        component: Artist
      },
      {
        path: "/discover/album",
        component: Album
      }
    ]
  },
  {
    path: "/mine",
    component: Mine
  },
  {
    path: "/friend",
    component: Friend
  }
]

export default routes
