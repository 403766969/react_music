import React, { memo, forwardRef, useState, useRef, useEffect, useCallback, useImperativeHandle } from 'react'

import { StyledWrapper } from './style'

export default memo(forwardRef(function ScrollContainer(props, ref) {

  /**
   * props and state
   */
  const { children, delta = 50, moveEffectTime = 1000, onWheel } = props

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
      }, moveEffectTime)
      if (wrapperEl.clientHeight >= contentEl.offsetHeight) {
        onWheel && onWheel(0, 0)
        setTop(0)
        return
      }
      const minTop = wrapperEl.clientHeight - contentEl.offsetHeight
      const maxTop = 0
      const currentTop = contentEl.offsetTop
      let targetTop = currentTop + delta * (e.deltaY > 0 ? -1 : 1)
      if (targetTop < minTop) {
        targetTop = minTop
      } else if (targetTop > maxTop) {
        targetTop = maxTop
      }
      onWheel && onWheel(targetTop, Math.abs(targetTop / minTop))
      setTop(targetTop)
    }
    wrapperEl.addEventListener('wheel', wheelCallback, { passive: false })
    return () => {
      wrapperEl.removeEventListener('wheel', wheelCallback)
    }
  }, [delta, moveEffectTime, onWheel])

  /**
   * other logic
   */
  const scrollUpdate = useCallback(() => {
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    if (wrapperEl.clientHeight >= contentEl.offsetHeight) {
      setTop(0)
      return
    }
    const minTop = wrapperEl.clientHeight - contentEl.offsetHeight
    const maxTop = 0
    let targetTop = contentEl.offsetTop
    if (targetTop < minTop) {
      targetTop = minTop
    } else if (targetTop > maxTop) {
      targetTop = maxTop
    }
    setTop(targetTop)
  }, [])

  const scrollToByTop = useCallback((targetTop = 0, duration = 0, steps = 0) => {
    if (wheelTimerRef.current) {
      return
    }
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    if (wrapperEl.clientHeight >= contentEl.offsetHeight) {
      setTop(0)
      return
    }
    const minTop = wrapperEl.clientHeight - contentEl.offsetHeight
    const maxTop = 0
    if (targetTop < minTop) {
      targetTop = minTop
    } else if (targetTop > maxTop) {
      targetTop = maxTop
    }
    if (duration <= 0 || steps <= 0) {
      setTop(targetTop)
      return
    }
    const currentTop = contentEl.offsetTop
    const distance = Math.abs(targetTop - currentTop)
    const direction = targetTop > currentTop ? 1 : -1
    const delay = duration / steps
    const step = distance / steps
    if (toTimerRef.current) {
      clearInterval(toTimerRef.current)
    }
    toTimerRef.current = setInterval(() => {
      const prevTop = contentEl.offsetTop
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
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    const minTop = wrapperEl.clientHeight - contentEl.offsetHeight
    let targetTop = percent * minTop
    scrollToByTop(targetTop, duration, steps)
  }, [scrollToByTop])

  /**
   * useImperativeHandle
   */
  useImperativeHandle(ref, () => ({
    wrapperEl: wrapperRef.current,
    contentEl: contentRef.current,
    scrollUpdate,
    scrollToByTop,
    scrollToByPercent
  }), [scrollUpdate, scrollToByTop, scrollToByPercent])

  return (
    <StyledWrapper className="cpn-scroll-container wrapper" ref={wrapperRef}>
      <div className="content" style={{ top: top + 'px' }} ref={contentRef} >
        {children}
      </div>
    </StyledWrapper>
  )
}))
