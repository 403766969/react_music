import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'

import ChannelBar from '@/components/channel-bar'

import { StyledWrapper } from './style'

export default memo(function Discover(props) {
  return (
    <StyledWrapper className="page-discover wrap-min-width">
      <ChannelBar />
      {renderRoutes(props.route.routes)}
    </StyledWrapper>
  )
})
