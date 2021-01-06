import React, { memo } from 'react'

import {
  StyleWrapper
} from './style'

export default memo(function Song(props) {
  console.log(props)

  return (
    <StyleWrapper>
      <h2>Song</h2>
    </StyleWrapper>
  )
})
