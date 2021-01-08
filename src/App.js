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
import AppBacktop from '@/components/app-backtop'
import AppPlayerBar from '@/components/app-player/app-player-bar'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        {renderRoutes(routes)}
        <AppFooter />
        <AppBacktop />
        <AppPlayerBar />
      </HashRouter>
    </Provider>
  )
})
