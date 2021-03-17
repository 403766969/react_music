import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function My() {
  return (
    <StyledWrapper className="page-my wrap-v3">
      <div className="bg">
        <span className="login" title="登录">登录</span>
      </div>
    </StyledWrapper>
  )
})
