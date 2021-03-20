import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Discover = lazy(() => import('@/pages/discover'))
const My = lazy(() => import('@/pages/my'))
const Friend = lazy(() => import('@/pages/friend'))
const Song = lazy(() => import('@/pages/song'))
const Artist = lazy(() => import('@/pages/artist'))
const Album = lazy(() => import('@/pages/album'))
const Songsheet = lazy(() => import('@/pages/songsheet'))
const Mv = lazy(() => import('@/pages/mv'))
const Search = lazy(() => import('@/pages/search'))
const Errorp = lazy(() => import('@/pages/errorp'))

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
      },
      {
        path: '/discover/*',
        render: () => (
          <Redirect to='/errorp' />
        )
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
    path: '/artist',
    component: Artist
  },
  {
    path: '/album',
    component: Album
  },
  {
    path: '/songsheet',
    component: Songsheet
  },
  {
    path: '/mv',
    component: Mv
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/errorp',
    component: Errorp
  },
  {
    path: '*',
    render: () => (
      <Redirect to='/errorp' />
    )
  }
]

export default routes
