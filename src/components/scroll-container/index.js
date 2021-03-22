import React, { memo, forwardRef, useState, useCallback, useRef, useImperativeHandle, useEffect } from 'react'

import { throttle } from '@/utils/performance'

import { StyledWrapper } from './style'

export default memo(forwardRef(function ScrollContainer(props, outerRef) {

  /**
   * props and state
   */
  const { wheelOffset = 50, wheelEffectTime = 1000, updateTrigger } = props

  const [contentPosition, setContentPosition] = useState(0)
  const [gripPosition, setGripPosition] = useState(0)
  const [gripSize, setGripSize] = useState(0)
  const [duration, setDuration] = useState(0)


  /**
   * state ref
   */
  const contentRangeRef = useRef(0)
  const gripRangeRef = useRef(0)
  const trackClientTopRef = useRef(0)
  const wheelTimerRef = useRef(null)
  const isDraggingRef = useRef(false)

  /**
   * dom ref
   */
  const containerRef = useRef()
  const wrapperRef = useRef()
  const contentRef = useRef()
  const trackRef = useRef()

  /**
   * dom update
   */
  useEffect(() => {
    const wrapperHeight = wrapperRef.current.clientHeight
    const contentHeight = contentRef.current.offsetHeight
    const trackHeight = trackRef.current.clientHeight
    let newContentRange = 0
    let newGripRange = 0
    let newGripSize = 0
    if (wrapperHeight < contentHeight) {
      let minSize = trackHeight / 10
      let tempSize = wrapperHeight / contentHeight * trackHeight
      newGripSize = tempSize > minSize ? tempSize : minSize
      newGripRange = trackHeight - newGripSize
      newContentRange = contentHeight - wrapperHeight
    }
    contentRangeRef.current = newContentRange
    gripRangeRef.current = newGripRange
    setGripSize(newGripSize)
    setDuration(0)
    setContentPosition(tempPosition => {
      if (tempPosition > newContentRange) {
        return newContentRange
      } else {
        return tempPosition
      }
    })
    setGripPosition(tempPosition => {
      if (tempPosition > newGripRange) {
        return newGripRange
      } else {
        return tempPosition
      }
    })
  }, [updateTrigger])

  /**
   * position logic
   */
  const getPositionByContentPosition = useCallback(tempPosition => {
    const contentRange = contentRangeRef.current
    const gripRange = gripRangeRef.current
    let newContentPostion = 0
    let newGripPosition = 0
    if (contentRange > 0 && tempPosition > 0) {
      if (tempPosition > contentRange) {
        newContentPostion = contentRange
        newGripPosition = gripRange
      } else {
        newContentPostion = tempPosition
        newGripPosition = tempPosition / contentRange * gripRange
      }
    }
    return {
      contentPosition: newContentPostion,
      gripPosition: newGripPosition
    }
  }, [])

  const getPositionByGripPosition = useCallback(tempPosition => {
    const contentRange = contentRangeRef.current
    const gripRange = gripRangeRef.current
    let newContentPostion = 0
    let newGripPosition = 0
    if (gripRange > 0 && tempPosition > 0) {
      if (tempPosition > gripRange) {
        newContentPostion = contentRange
        newGripPosition = gripRange
      } else {
        newContentPostion = tempPosition / gripRange * contentRange
        newGripPosition = tempPosition
      }
    }
    return {
      contentPosition: newContentPostion,
      gripPosition: newGripPosition
    }
  }, [])

  const getPositionByPrecent = useCallback(tempPrecent => {
    const contentRange = contentRangeRef.current
    const gripRange = gripRangeRef.current
    let precent = tempPrecent
    if (precent < 0) {
      precent = 0
    } else if (precent > 1) {
      precent = 1
    }
    return {
      contentPosition: contentRange * precent,
      gripPosition: gripRange * precent
    }
  }, [])

  const scrollToByContentPosition = useCallback((tempPosition = 0, duration = 0) => {
    if (wheelTimerRef.current || isDraggingRef.current) {
      return
    }
    let position = getPositionByContentPosition(tempPosition)
    setDuration(duration)
    setContentPosition(position.contentPosition)
    setGripPosition(position.gripPosition)
  }, [getPositionByContentPosition])

  const scrollToByGripPosition = useCallback((tempPosition = 0, duration = 0) => {
    if (wheelTimerRef.current || isDraggingRef.current) {
      return
    }
    let position = getPositionByGripPosition(tempPosition)
    setDuration(duration)
    setContentPosition(position.contentPosition)
    setGripPosition(position.gripPosition)
  }, [getPositionByGripPosition])

  const scrollToByPrecent = useCallback((tempPrecent = 0, duration = 0) => {
    if (wheelTimerRef.current || isDraggingRef.current) {
      return
    }
    let position = getPositionByPrecent(tempPrecent)
    setDuration(duration)
    setContentPosition(position.contentPosition)
    setGripPosition(position.gripPosition)
  }, [getPositionByPrecent])

  /**
   * imperativeHandle hooks
   */
  useImperativeHandle(outerRef, () => ({
    scrollToByContentPosition,
    scrollToByGripPosition,
    scrollToByPrecent
  }), [scrollToByContentPosition, scrollToByGripPosition, scrollToByPrecent])

  /**
   * dom event
   */
  // wheel
  useEffect(() => {
    const containerEl = containerRef.current
    const wheelCallback = e => {
      e.preventDefault()
      if (wheelTimerRef.current) {
        clearTimeout(wheelTimerRef.current)
      }
      wheelTimerRef.current = setTimeout(() => {
        clearTimeout(wheelTimerRef.current)
        wheelTimerRef.current = null
      }, wheelEffectTime)
      setDuration(0)
      setContentPosition(tempPosition => {
        const position = getPositionByContentPosition(tempPosition + wheelOffset * (e.deltaY > 0 ? 1 : -1))
        setGripPosition(position.gripPosition)
        return position.contentPosition
      })
    }
    containerEl.addEventListener('wheel', wheelCallback, { passive: false })
    return () => {
      containerEl.removeEventListener('wheel', wheelCallback, { passive: false })
    }
  }, [getPositionByContentPosition, wheelOffset, wheelEffectTime])

  // mousedown
  useEffect(() => {
    const trackEl = trackRef.current
    const mousedownCallback = e => {
      isDraggingRef.current = true
      trackClientTopRef.current = trackEl.getBoundingClientRect().top
      setDuration(0)
      setGripSize(size => {
        const position = getPositionByGripPosition(e.clientY - trackClientTopRef.current - size / 2)
        setContentPosition(position.contentPosition)
        setGripPosition(position.gripPosition)
        return size
      })
    }
    trackEl.addEventListener('mousedown', mousedownCallback)
    return () => {
      trackEl.removeEventListener('mousedown', mousedownCallback)
    }
  }, [getPositionByGripPosition])

  // mousemove
  useEffect(() => {
    const mousemoveCallback = throttle(e => {
      if (!isDraggingRef.current) {
        return
      }
      window.getSelection && window.getSelection().removeAllRanges()
      setDuration(0)
      setGripSize(size => {
        const position = getPositionByGripPosition(e.clientY - trackClientTopRef.current - size / 2)
        setContentPosition(position.contentPosition)
        setGripPosition(position.gripPosition)
        return size
      })
    }, 30)
    document.addEventListener('mousemove', mousemoveCallback)
    return () => {
      document.removeEventListener('mousemove', mousemoveCallback)
    }
  }, [getPositionByGripPosition])

  // mouseup
  useEffect(() => {
    const mouseupCallback = e => {
      isDraggingRef.current = false
    }
    document.addEventListener('mouseup', mouseupCallback)
    return () => {
      document.removeEventListener('mouseup', mouseupCallback)
    }
  }, [])

  return (
    <StyledWrapper className="cpn-scroll-container" ref={containerRef}>
      <div className="scroll-main">
        <div className="scroll-wrapper" ref={wrapperRef}>
          <div
            className="scroll-content"
            ref={contentRef}
            style={{
              transform: `translateY(${contentPosition * -1}px)`,
              transition: `transform ${duration}s linear 0s`
            }}>
            {props.children}
          </div>
        </div>
      </div>
      <div className="scroll-bar">
        <div className="scroll-track" ref={trackRef}>
          <span
            className="scroll-grip"
            style={{
              display: gripSize > 0 ? 'block' : 'none',
              height: `${gripSize}px`,
              transform: `translateY(${gripPosition}px)`,
              transition: `transform ${duration}s linear 0s`
            }}>
          </span>
        </div>
      </div>
    </StyledWrapper>
  )
}))
