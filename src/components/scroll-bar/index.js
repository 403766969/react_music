import React, { memo, forwardRef, useState, useRef, useEffect, useCallback, useImperativeHandle } from 'react'

import {
  StyledWrapper
} from './style'

export default memo(forwardRef(function ScrollBar(props, ref) {

  /**
   * props and state
   */
  const { gripSize = 0, moveEffectTime = 1000, onDrag } = props

  const [top, setTop] = useState(0)

  /**
   * other hooks
   */
  const trackRef = useRef()
  const gripRef = useRef()

  const isDownRef = useRef(false)

  const moveTimerRef = useRef(null)
  const toTimerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = e => {
      if (!isDownRef.current) {
        return
      }
      if (moveTimerRef.current) {
        clearTimeout(moveTimerRef.current)
      }
      moveTimerRef.current = setTimeout(() => {
        clearTimeout(moveTimerRef.current)
        moveTimerRef.current = null
      }, moveEffectTime)
      const trackEl = trackRef.current
      const gripEl = gripRef.current
      const minTop = 0
      const maxTop = trackEl.clientHeight - gripEl.offsetHeight
      let targetTop = e.clientY - trackEl.getBoundingClientRect().top - gripEl.offsetHeight / 2
      if (targetTop < minTop) {
        targetTop = minTop
      } else if (targetTop > maxTop) {
        targetTop = maxTop
      }
      window.getSelection && window.getSelection().removeAllRanges()
      onDrag && onDrag(targetTop, targetTop / maxTop)
      setTop(targetTop)
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [moveEffectTime, onDrag])

  useEffect(() => {
    const handleMouseUp = e => {
      isDownRef.current = false
    }
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    if (gripSize > 0) {
      const trackEl = trackRef.current
      const gripEl = gripRef.current
      const minTop = 0
      const maxTop = trackEl.clientHeight - gripSize
      let targetTop = gripEl.offsetTop
      if (targetTop < minTop) {
        targetTop = minTop
      } else if (targetTop > maxTop) {
        targetTop = maxTop
      }
      setTop(targetTop)
    }
  }, [gripSize])

  /**
   * other logic
   */
  const handleMouseDown = e => {
    isDownRef.current = true
    const trackEl = trackRef.current
    const gripEl = gripRef.current
    const minTop = 0
    const maxTop = trackEl.clientHeight - gripEl.offsetHeight
    let targetTop = e.clientY - trackEl.getBoundingClientRect().top - gripEl.offsetHeight / 2
    if (targetTop < minTop) {
      targetTop = minTop
    } else if (targetTop > maxTop) {
      targetTop = maxTop
    }
    onDrag && onDrag(targetTop, targetTop / maxTop)
    setTop(targetTop)
  }

  const scrollToByTop = useCallback((targetTop = 0, duration = 0, steps = 0) => {
    if (moveTimerRef.current) {
      return
    }
    const trackEl = trackRef.current
    const gripEl = gripRef.current
    const minTop = 0
    const maxTop = trackEl.clientHeight - gripEl.offsetHeight
    if (targetTop < minTop) {
      targetTop = minTop
    } else if (targetTop > maxTop) {
      targetTop = maxTop
    }
    if (duration <= 0 || steps <= 0) {
      setTop(targetTop)
      return
    }
    const currentTop = gripEl.offsetTop
    const distance = Math.abs(targetTop - currentTop)
    const direction = targetTop > currentTop ? 1 : -1
    const delay = duration / steps
    const step = distance / steps
    if (toTimerRef.current) {
      clearInterval(toTimerRef.current)
    }
    toTimerRef.current = setInterval(() => {
      const prevTop = gripEl.offsetTop
      const nextTop = prevTop + step * direction
      if ((direction > 0 && nextTop >= targetTop) || (direction < 0 && nextTop <= targetTop)) {
        clearInterval(toTimerRef.current)
        toTimerRef.current = null
        setTop(targetTop)
      } else {
        setTop(nextTop)
      }
    }, delay)
  }, [])

  const scrollToByPercent = useCallback((percent = 0, duration = 0, steps = 0) => {
    const trackEl = trackRef.current
    const gripEl = gripRef.current
    const maxTop = trackEl.clientHeight - gripEl.offsetHeight
    let targetTop = percent * maxTop
    scrollToByTop(targetTop, duration, steps)
  }, [scrollToByTop])

  /**
   * useImperativeHandle
   */
  useImperativeHandle(ref, () => ({
    scrollToByTop,
    scrollToByPercent
  }), [scrollToByTop, scrollToByPercent])

  return (
    <StyledWrapper className="scroll-bar" gripSize={parseInt(gripSize)}>
      <div className="scroll-track" onMouseDown={handleMouseDown} ref={trackRef}>
        <span className="scroll-grip" style={{ top: top + 'px' }} ref={gripRef}></span>
      </div>
    </StyledWrapper>
  )
}))
