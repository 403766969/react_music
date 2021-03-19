import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'

import { StyledWrapper } from './style'

export default memo(function Discover(props) {
  return (
    <StyledWrapper className="page-discover">
      {renderRoutes(props.route.routes)}
    </StyledWrapper>
  )
})
