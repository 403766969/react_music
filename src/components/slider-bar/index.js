import React, { memo, useRef, useEffect } from 'react'

import {
  StyledWrapper
} from './style'

export default memo(function SliderBar(props) {

  /**
   * props and state
   */
  const { gripLength = 0, vertical } = props

  /**
   * other hooks
   */
  const trackRef = useRef()
  const gripRef = useRef()

  const pageTopRef = useRef(0)

  useEffect(() => {
    const trackEl = trackRef.current
    let parent = trackEl.offsetParent
    let tempTop = trackEl.offsetTop
    while (parent) {
      tempTop = tempTop + parent.offsetTop
      parent = parent.offsetParent
    }
    pageTopRef.current = tempTop
  }, [])

  /**
   * other logic
   */
  const direction = vertical ? 'slider-vertical' : 'slider-horizontal'

  return (
    <StyledWrapper className={`slider ${direction}`} gripLength={gripLength}>
      <div className={`track ${direction}`} ref={trackRef}>
        <span className={`grip ${direction}`} ref={gripRef}>
        </span>
      </div>
    </StyledWrapper>
  )
})
