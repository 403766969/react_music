import React, { memo, Suspense } from 'react'

import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

import routes from '@/router'
import store from '@/store'

import 'antd/dist/antd.css'
import '@/assets/css/base.css'

import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppNote from '@/components/app-note'
import BackTop from '@/components/back-top'
import DocumentTitle from '@/components/document-title'

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
        <AppNote />
        <BackTop />
        <DocumentTitle />
        <Player />
      </Provider>
    </HashRouter>
  )
})
