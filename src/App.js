import React, { memo } from 'react'

import 'antd/dist/antd.css'
import '@/assets/css/base.css'

import store from '@/store'
import routes from '@/router'

import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import BackTop from '@/components/back-top'
// import DocuTitle from '@/components/docu-title'

import Player from '@/pages/player'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        {renderRoutes(routes)}
        <AppFooter />
        <BackTop />
        {/* <DocuTitle /> */}
        <Player />
      </HashRouter>
    </Provider>
  )
})
