import React, { memo } from 'react'

import { BackTop } from 'antd'

import { StyledWrapper } from './style'

export default memo(function AppBacktop() {
  return (
    <StyledWrapper>
      <BackTop visibilityHeight={10}>
        <div className="app-backtop sprite_03" title="回到顶部">回到顶部</div>
      </BackTop>
    </StyledWrapper>
  )
})
