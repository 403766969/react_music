import React, { memo, Suspense } from 'react'

import 'antd/dist/antd.css'
import '@/assets/css/base.css'

import routes from '@/router'
import store from '@/store'

import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import BackTop from '@/components/back-top'

import Player from '@/pages/player'

export default memo(function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppHeader />
        <Suspense fallback={<div>Loading...</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <AppFooter />
        <BackTop />
        <Player />
      </Provider>
    </HashRouter>
  )
})
