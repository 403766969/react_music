import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function InitialSelector(props) {

  /**
   * const and let
   */
  const list = [
    '热门',
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q',
    'R', 'S', 'T',
    'U', 'V', 'W',
    'X', 'Y', 'Z',
    '其他']

  /**
   * props and state
   */
  const { current, onClick } = props

  /**
   * other logic
   */
  const handleClick = (item, index) => {
    if (onClick && typeof onClick === 'function') {
      onClick(item, index)
    }
  }

  return (
    <StyledWrapper className="cpn-initial-selector">
      {
        list.map((item, index) => {
          return (
            <li
              className={`item ${item === current ? 'active' : ''}`}
              key={item}
              onClick={() => handleClick(item, index)}>{item}</li>
          )
        })
      }
    </StyledWrapper>
  )
})
