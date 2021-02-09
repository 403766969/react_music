import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function My() {
  return (
    <StyledWrapper className="page-my">
      <h2>My</h2>
    </StyledWrapper>
  )
})
