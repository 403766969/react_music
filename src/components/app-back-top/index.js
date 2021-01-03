import React, { memo } from 'react'

import { BackTop } from 'antd'

import {
  AppBackTopWrapper
} from './style'

export default memo(function AppBackTop() {
  return (
    <AppBackTopWrapper>
      <BackTop visibilityHeight={10}>
        <div className="app-back-top sprite_03" title="回到顶部">回到顶部</div>
      </BackTop>
    </AppBackTopWrapper>
  )
})
