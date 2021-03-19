import React, { memo } from 'react'

import NotFound from '@/components/not-found'

import { StyledWrapper } from './style'

export default memo(function Errorp() {
  return (
    <StyledWrapper className="page-errorp wrap-v3">
      <NotFound />
    </StyledWrapper>
  )
})
