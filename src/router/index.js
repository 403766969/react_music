import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Discover = lazy(() => import('@/pages/discover'))
const My = lazy(() => import('@/pages/my'))
const Friend = lazy(() => import('@/pages/friend'))
const Song = lazy(() => import('@/pages/song'))

const DiscoverRecomd = lazy(() => import('@/pages/c-pages/discover-recomd'))
const DiscoverToplist = lazy(() => import('@/pages/c-pages/discover-toplist'))
const DiscoverSongsheet = lazy(() => import('@/pages/c-pages/discover-songsheet'))
const DiscoverDjradio = lazy(() => import('@/pages/c-pages/discover-djradio'))
const DiscoverArtist = lazy(() => import('@/pages/c-pages/discover-artist'))
const DiscoverAlbum = lazy(() => import('@/pages/c-pages/discover-album'))

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
        component: DiscoverRecomd
      },
      {
        path: '/discover/toplist',
        component: DiscoverToplist
      },
      {
        path: '/discover/songsheet',
        component: DiscoverSongsheet
      },
      {
        path: '/discover/djradio',
        component: DiscoverDjradio
      },
      {
        path: '/discover/artist',
        component: DiscoverArtist
      },
      {
        path: '/discover/album',
        component: DiscoverAlbum
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
