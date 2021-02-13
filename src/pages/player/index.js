import React, { memo } from 'react'

import PlayerBar from './c-cpns/player-bar'

import { StyledWrapper } from './style'

export default memo(function Player() {
  return (
    <StyledWrapper className="page-player wrap-min-width">
      <PlayerBar />
    </StyledWrapper>
  )
})
