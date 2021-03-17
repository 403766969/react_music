import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function NotFound() {
  return (
    <StyledWrapper className="cpn-not-found">
      <div className="image"></div>
      <p className="text">很抱歉，你要查找的网页找不到</p>
    </StyledWrapper>
  )
})
