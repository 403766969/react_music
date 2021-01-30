import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Discover = lazy(() => import('@/pages/discover'))
const My = lazy(() => import('@/pages/my'))
const Friend = lazy(() => import('@/pages/friend'))
const Song = lazy(() => import('@/pages/song'))

const Recomd = lazy(() => import('@/pages/discover/c-pages/recomd'))
const Toplist = lazy(() => import('@/pages/discover/c-pages/toplist'))
const Songsheet = lazy(() => import('@/pages/discover/c-pages/songsheet'))
const Djradio = lazy(() => import('@/pages/discover/c-pages/djradio'))
const Artist = lazy(() => import('@/pages/discover/c-pages/artist'))
const Album = lazy(() => import('@/pages/discover/c-pages/album'))


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
        path: '/discover/songsheet',
        component: Songsheet
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
