import React, { memo } from 'react'

import NotFound from '@/components/not-found'

import { StyledWrapper } from './style'

export default memo(function DiscoverDjradio() {
  return (
    <StyledWrapper className="page-discover-djradio wrap-v3">
      <NotFound />
    </StyledWrapper>
  )
})
