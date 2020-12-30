import React, { memo } from 'react'

import { renderRoutes } from 'react-router-config'

export default memo(function Discover(props) {
  return (
    <div>
      {renderRoutes(props.route.routes)}
    </div>
  )
})
