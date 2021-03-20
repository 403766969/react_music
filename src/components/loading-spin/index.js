import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function index(props) {

  /**
   * props and state
   */
  const { text } = props

  return (
    <StyledWrapper className="cpn-loading-spin">
      <div className="loading-spin-content">
        <i className="loading-spin-dot"></i>
        <i className="loading-spin-dot"></i>
        <i className="loading-spin-dot"></i>
        <i className="loading-spin-dot"></i>
      </div>
      {
        text && (
          <span className="loading-spin-text">{text}</span>
        )
      }
    </StyledWrapper>
  )
})
