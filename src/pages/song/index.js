import React, { memo } from 'react'

import {
  StyleWrapper
} from './style'

export default memo(function Song(props) {

  const params = new URLSearchParams(props.location.search)

  console.log(params.get('id'))

  return (
    <StyleWrapper>
      <h2>Song</h2>
    </StyleWrapper>
  )
})
