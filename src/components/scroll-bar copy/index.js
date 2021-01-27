import React, { memo, useRef, useEffect } from 'react'

import {
  StyledWrapper
} from './style'

export default memo(function ScrollBar(props) {

  /**
   * props and state
   */
  const { value = 0, gripSize = 0, onChange, horizontal } = props

  /**
   * other hooks
   */
  const trackRef = useRef()

  const startPosRef = useRef(0)
  const endPosRef = useRef(0)

  const isDownRef = useRef(false)

  useEffect(() => {
    const trackEl = trackRef.current
    if (horizontal) {
      startPosRef.current = gripSize / 2
      endPosRef.current = trackEl.clientWidth - gripSize / 2
    } else {
      startPosRef.current = gripSize / 2
      endPosRef.current = trackEl.clientHeight - gripSize / 2
    }
  }, [horizontal, gripSize])

  useEffect(() => {
    const handleMouseMove = e => {
      if (!isDownRef.current) {
        return
      }
      window.getSelection().removeAllRanges()
      const trackEl = trackRef.current
      let movePos = 0
      if (horizontal) {
        movePos = e.clientX - trackEl.getBoundingClientRect().left
      } else {
        movePos = e.clientY - trackEl.getBoundingClientRect().top
      }
      if (movePos < startPosRef.current) {
        movePos = startPosRef.current
      } else if (movePos > endPosRef.current) {
        movePos = endPosRef.current
      }
      const value = (movePos - startPosRef.current) / (endPosRef.current - startPosRef.current)
      onChange && onChange(value)
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [horizontal, onChange])

  useEffect(() => {
    const handleMouseUp = e => {
      isDownRef.current = false
    }
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  /**
   * other logic
   */
  const handleMouseDown = e => {
    isDownRef.current = true
    const trackEl = trackRef.current
    let movePos = 0
    if (horizontal) {
      movePos = e.clientX - trackEl.getBoundingClientRect().left
    } else {
      movePos = e.clientY - trackEl.getBoundingClientRect().top
    }
    if (movePos < startPosRef.current) {
      movePos = startPosRef.current
    } else if (movePos > endPosRef.current) {
      movePos = endPosRef.current
    }
    const value = (movePos - startPosRef.current) / (endPosRef.current - startPosRef.current)
    onChange && onChange(value)
  }

  const posStyle = horizontal
    ? {
      left: value * (endPosRef.current - startPosRef.current) + 'px'
    }
    : {
      top: value * (endPosRef.current - startPosRef.current) + 'px'
    }

  return (
    <StyledWrapper className={`scroll-bar ${horizontal ? 'horizontal' : 'vertical'}`} gripSize={gripSize}>
      <div className={`scroll-track ${horizontal ? 'horizontal' : 'vertical'}`}
        onMouseDown={handleMouseDown}
        ref={trackRef}>
        <span className={`scroll-grip ${horizontal ? 'horizontal' : 'vertical'}`} style={posStyle}></span>
      </div>
    </StyledWrapper>
  )
})
