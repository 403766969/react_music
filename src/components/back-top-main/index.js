import React, { memo } from 'react'

import { BackTop } from 'antd'

import {
  BackTopMainWrapper
} from './style'

export default memo(function BackTopMain() {
  return (
    <BackTopMainWrapper>
      <BackTop visibilityHeight={10}>
        <div className="back-top-main sprite_03" title="回到顶部">回到顶部</div>
      </BackTop>
    </BackTopMainWrapper>
  )
})
