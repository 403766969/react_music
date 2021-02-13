import React, { memo, forwardRef } from 'react'

import { StyledWrapper } from './style'

export default memo(forwardRef(function LyricDisplay(props, ref) {

  /**
   * props and state
   */
  const { currentLyric = [], currentLyricIndex = -1 } = props

  return (
    <StyledWrapper className="cpn-lyric-display" ref={ref}>
      {
        currentLyric.map((item, index) => {
          return (
            <p
              key={item.time + item.content}
              className={`lyric-item ${currentLyricIndex === index ? 'active' : ''}`}>
              {item.content}
              <br />
              {item.translation}
            </p>
          )
        })
      }
    </StyledWrapper>
  )
}))
