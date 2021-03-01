import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Discover = lazy(() => import('@/pages/discover'))
const My = lazy(() => import('@/pages/my'))
const Friend = lazy(() => import('@/pages/friend'))
const Song = lazy(() => import('@/pages/song'))
const Songsheet = lazy(() => import('@/pages/songsheet'))
const Artist = lazy(() => import('@/pages/artist'))

const DiscoverRecomd = lazy(() => import('@/pages/discover/c-pages/discover-recomd'))
const DiscoverToplist = lazy(() => import('@/pages/discover/c-pages/discover-toplist'))
const DiscoverSongsheet = lazy(() => import('@/pages/discover/c-pages/discover-songsheet'))
const DiscoverDjradio = lazy(() => import('@/pages/discover/c-pages/discover-djradio'))
const DiscoverArtist = lazy(() => import('@/pages/discover/c-pages/discover-artist'))
const DiscoverAlbum = lazy(() => import('@/pages/discover/c-pages/discover-album'))

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
  },
  {
    path: '/songsheet',
    component: Songsheet
  },
  {
    path: '/artist',
    component: Artist
  }
]

export default routes
