import React, { memo } from 'react'

import {
  StyledWrapper
} from './style'

export default memo(function LyricDisplay(props) {

  /**
   * props and state
   */
  const { currentLyric = [], currentLyricIndex = -1 } = props

  return (
    <StyledWrapper>
      {
        currentLyric.map((item, index) => {
          return (
            <p
              key={item.time + item.content}
              className={`lyric-item ${currentLyricIndex === index ? 'active' : ''}`}>
              {item.content}
            </p>
          )
        })
      }
    </StyledWrapper>
  )
})
