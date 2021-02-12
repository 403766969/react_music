import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function Friend() {
  return (
    <StyledWrapper className="page-friend wrap-min-width">
      <h2>Friend</h2>
    </StyledWrapper>
  )
})
