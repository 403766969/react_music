import React, { memo } from 'react'

import AppPlayerBar from './c-cpns/app-player-bar'

import {
  StyledWrapper
} from './style'

export default memo(function AppPlayer() {
  return (
    <StyledWrapper>
      <AppPlayerBar />
    </StyledWrapper>
  )
})
