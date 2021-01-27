import React, { memo, forwardRef, useState, useRef, useEffect, useCallback, useImperativeHandle } from 'react'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(forwardRef(function ScrollContainer(props, ref) {

  /**
   * props and state
   */
  const { children, onWheel, delta = 50, wheelDuration = 1000 } = props

  const [top, setTop] = useState(0)

  /**
   * other hooks
   */
  const wrapperRef = useRef()
  const contentRef = useRef()

  const wheelTimerRef = useRef(null)
  const toTimerRef = useRef(null)

  useEffect(() => {
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    const wheelCallback = e => {
      e.preventDefault()
      if (wheelTimerRef.current) {
        clearTimeout(wheelTimerRef.current)
      }
      wheelTimerRef.current = setTimeout(() => {
        clearTimeout(wheelTimerRef.current)
        wheelTimerRef.current = null
      }, wheelDuration)
      const wrapperHeight = wrapperEl.clientHeight
      const contentHeight = contentEl.offsetHeight
      if (wrapperHeight >= contentHeight) {
        setTop(0)
        onWheel && onWheel(0, 0)
        return
      }
      const minTop = wrapperHeight - contentHeight
      const maxTop = 0
      const currentTop = contentEl.offsetTop
      let targetTop = currentTop + delta * (e.deltaY > 0 ? -1 : 1)
      if (targetTop < minTop) {
        targetTop = minTop
      } else if (targetTop > maxTop) {
        targetTop = maxTop
      }
      setTop(targetTop)
      onWheel && onWheel(Math.abs(targetTop), Math.abs(targetTop / minTop))
    }
    wrapperEl.addEventListener('wheel', wheelCallback, { passive: false })
    return () => {
      wrapperEl.removeEventListener('wheel', wheelCallback)
    }
  }, [onWheel, delta, wheelDuration])

  /**
   * other logic
   */
  const scrollUpdate = useCallback(() => {
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    const wrapperHeight = wrapperEl.clientHeight
    const contentHeight = contentEl.offsetHeight
    if (wrapperHeight >= contentHeight) {
      setTop(0)
      onWheel && onWheel(0, 0)
      return
    }
    const minTop = wrapperHeight - contentHeight
    const maxTop = 0
    let targetTop = contentEl.offsetTop
    if (targetTop < minTop) {
      targetTop = minTop
    } else if (targetTop > maxTop) {
      targetTop = maxTop
    }
    setTop(targetTop)
    onWheel && onWheel(Math.abs(targetTop), Math.abs(targetTop / minTop))
  }, [onWheel])

  const scrollTo = useCallback((to = 0, duration = 0, steps = 0) => {
    if (wheelTimerRef.current) {
      return
    }
    const targetTop = to * -1
    if (duration <= 0 || steps <= 0) {
      setTop(targetTop)
      return
    }
    const currentTop = contentRef.current.offsetTop
    const distance = Math.abs(targetTop - currentTop)
    const isUp = targetTop < currentTop
    const step = (distance / steps) * (isUp ? -1 : 1)
    const delay = duration / steps
    if (toTimerRef.current) {
      clearInterval(toTimerRef.current)
    }
    toTimerRef.current = setInterval(() => {
      const prevTop = contentRef.current.offsetTop
      const nextTop = prevTop + step
      if ((isUp && (nextTop <= targetTop)) || (!isUp && (nextTop >= targetTop))) {
        clearInterval(toTimerRef.current)
        toTimerRef.current = null
        setTop(targetTop)
      } else {
        setTop(nextTop)
      }
    }, delay)
  }, [])

  /**
   * useImperativeHandle
   */
  useImperativeHandle(ref, () => ({
    wrapperEl: wrapperRef.current,
    contentEl: contentRef.current,
    to: Math.abs(contentRef.current.offsetTop),
    scrollUpdate,
    scrollTo
  }), [scrollUpdate, scrollTo])

  return (
    <StyledWrapper ref={wrapperRef}>
      <StyledContent ref={contentRef} style={{ top: top + 'px' }}>
        {children}
      </StyledContent>
    </StyledWrapper>
  )
}))
