import React, { memo, forwardRef, useRef, useState, useCallback, useEffect, useImperativeHandle } from 'react'

import { throttle } from '@/utils/performance'

import { StyledWrapper } from './style'

export default memo(forwardRef(function ScrollArea(props, ref) {

  /**
   * props and state
   */
  const { wheelOffset = 50, wheelEffectTime = 1000, updateTrigger } = props

  const [contentTop, setContentTop] = useState(0)
  const [gripTop, setGripTop] = useState(0)

  const [gripHeight, setGripHeight] = useState(0)

  const [duration, setDuration] = useState(0)

  /**
   * ref hooks
   */
  const wrapperRef = useRef()
  const contentRef = useRef()
  const trackRef = useRef()
  const gripRef = useRef()

  const contentMinTopRef = useRef(0)
  const gripMaxTopRef = useRef(0)

  const trackOffsetTopRef = useRef(0)
  const gripOffsetHeightRef = useRef(0)

  const wheelTimerRef = useRef(null)
  const isDraggingRef = useRef(false)

  /**
   * callback hooks
   */
  const getPositionByContentTop = useCallback(tempTop => {
    let contentTop = 0
    let gripTop = 0
    if (contentMinTopRef.current !== 0) {
      if (tempTop > 0) {
        contentTop = 0
        gripTop = 0
      } else if (tempTop < contentMinTopRef.current) {
        contentTop = contentMinTopRef.current
        gripTop = gripMaxTopRef.current
      } else {
        contentTop = tempTop
        gripTop = Math.abs(tempTop / contentMinTopRef.current) * gripMaxTopRef.current
      }
    }
    return {
      contentTop,
      gripTop
    }
  }, [])

  const getPositionByGripTop = useCallback(tempTop => {
    let contentTop = 0
    let gripTop = 0
    if (gripMaxTopRef.current !== 0) {
      if (tempTop < 0) {
        contentTop = 0
        gripTop = 0
      } else if (tempTop > gripMaxTopRef.current) {
        contentTop = contentMinTopRef.current
        gripTop = gripMaxTopRef.current
      } else {
        contentTop = Math.abs(tempTop / gripMaxTopRef.current) * contentMinTopRef.current
        gripTop = tempTop
      }
    }
    return {
      contentTop,
      gripTop
    }
  }, [])

  const getPositionByPrecent = useCallback(tempPrecent => {
    let precent = tempPrecent
    if (precent < 0) {
      precent = 0
    } else if (precent > 1) {
      precent = 1
    }
    let contentTop = contentMinTopRef.current * precent
    let gripTop = gripMaxTopRef.current * precent
    return {
      contentTop,
      gripTop
    }
  }, [])

  const scrollToByContentTop = useCallback((tempTop = 0, duration = 0) => {
    if (wheelTimerRef.current || isDraggingRef.current) {
      return
    }
    let position = getPositionByContentTop(tempTop)
    setDuration(duration)
    setContentTop(position.contentTop)
    setGripTop(position.gripTop)
  }, [getPositionByContentTop])

  const scrollToByGripTop = useCallback((tempTop = 0, duration = 0) => {
    if (wheelTimerRef.current || isDraggingRef.current) {
      return
    }
    let position = getPositionByGripTop(tempTop)
    setDuration(duration)
    setContentTop(position.contentTop)
    setGripTop(position.gripTop)
  }, [getPositionByGripTop])

  const scrollToByPrecent = useCallback((tempPrecent = 0, duration = 0) => {
    if (wheelTimerRef.current || isDraggingRef.current) {
      return
    }
    let position = getPositionByPrecent(tempPrecent)
    setDuration(duration)
    setContentTop(position.contentTop)
    setGripTop(position.gripTop)
  }, [getPositionByPrecent])

  const scrollUpdate = useCallback(() => {
    const wrapperHeight = wrapperRef.current.clientHeight
    const contentHeight = contentRef.current.offsetHeight
    const trackHeight = trackRef.current.clientHeight
    let gap = 0
    let size = 0
    if (wrapperHeight < contentHeight) {
      let size1 = wrapperHeight / contentHeight * trackHeight
      let size2 = trackHeight / 10
      gap = wrapperHeight - contentHeight
      size = size1 > size2 ? size1 : size2
    }
    contentMinTopRef.current = gap
    gripMaxTopRef.current = trackHeight - size
    trackOffsetTopRef.current = trackRef.current.getBoundingClientRect().top
    gripOffsetHeightRef.current = size
    setGripHeight(size)
    setDuration(0)
    setContentTop(tempTop => {
      let position = getPositionByContentTop(tempTop)
      setGripTop(position.gripTop)
      return position.contentTop
    })
  }, [getPositionByContentTop])

  /**
   * imperativeHandle hooks
   */
  useImperativeHandle(ref, () => ({
    scrollToByContentTop,
    scrollToByGripTop,
    scrollToByPrecent
  }), [scrollToByContentTop, scrollToByGripTop, scrollToByPrecent])

  /**
   * effect hooks
   */
  useEffect(() => {
    scrollUpdate()
  }, [scrollUpdate, updateTrigger])

  useEffect(() => {
    const contentEl = contentRef.current
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
      setContentTop(tempTop => {
        let position = getPositionByContentTop(tempTop + wheelOffset * (e.deltaY > 0 ? -1 : 1))
        setGripTop(position.gripTop)
        return position.contentTop
      })
    }
    contentEl.addEventListener('wheel', wheelCallback, { passive: false })
    return () => {
      contentEl.removeEventListener('wheel', wheelCallback, { passive: false })
    }
  }, [getPositionByContentTop, wheelOffset, wheelEffectTime])

  useEffect(() => {
    const trackEl = trackRef.current
    const downCallback = e => {
      isDraggingRef.current = true
      setDuration(0)
      let position = getPositionByGripTop(e.clientY - trackOffsetTopRef.current - gripOffsetHeightRef.current / 2)
      setContentTop(position.contentTop)
      setGripTop(position.gripTop)
    }
    trackEl.addEventListener('mousedown', downCallback)
    return () => {
      trackEl.removeEventListener('mousedown', downCallback)
    }
  }, [getPositionByGripTop])

  useEffect(() => {
    const moveCallback = throttle(e => {
      if (!isDraggingRef.current) {
        return
      }
      window.getSelection && window.getSelection().removeAllRanges()
      setDuration(0)
      let position = getPositionByGripTop(e.clientY - trackOffsetTopRef.current - gripOffsetHeightRef.current / 2)
      setContentTop(position.contentTop)
      setGripTop(position.gripTop)
    }, 30)
    document.addEventListener('mousemove', moveCallback)
    return () => {
      document.removeEventListener('mousemove', moveCallback)
    }
  }, [getPositionByGripTop])

  useEffect(() => {
    const upCallback = e => {
      isDraggingRef.current = false
    }
    document.addEventListener('mouseup', upCallback)
    return () => {
      document.removeEventListener('mouseup', upCallback)
    }
  }, [])

  return (
    <StyledWrapper className="cpn-scroll-area">
      <div className="scroll-main">
        <div className="wrapper" ref={wrapperRef}>
          <div className="content" ref={contentRef}
            style={{
              top: `${contentTop}px`,
              transition: `top ${duration}s linear 0s`
            }}>
            {props.children}
          </div>
        </div>
      </div>
      <div className="scroll-bar">
        <div className="track" ref={trackRef}>
          <span className="grip" ref={gripRef}
            style={{
              display: gripHeight > 0 ? 'block' : 'none',
              height: `${gripHeight}px`,
              top: `${gripTop}px`,
              transition: `top ${duration}s linear 0s`
            }}>
          </span>
        </div>
      </div>
    </StyledWrapper>
  )
}))
