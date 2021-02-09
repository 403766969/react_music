import React, { memo } from 'react'

import { BackTop as AntdBacktop } from 'antd'

import { StyledWrapper } from './style'

export default memo(function BackTop() {
  return (
    <StyledWrapper className="cpn-back-top">
      <AntdBacktop visibilityHeight={10}>
        <div className="back-top sprite_03" title="回到顶部">回到顶部</div>
      </AntdBacktop>
    </StyledWrapper>
  )
})
