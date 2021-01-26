import React, { memo, forwardRef, useRef, useEffect, useImperativeHandle } from 'react'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(forwardRef(function ScrollContainer(props, ref) {

  /**
   * props and state
   */
  const { children, delta = 55, wheelDelay = 1000 } = props

  /**
   * other hooks
   */
  const wrapperRef = useRef()
  const contentRef = useRef()

  const wheel_timerRef = useRef(null)
  const to_timerRef = useRef(null)

  useEffect(() => {
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    const wheelCallback = e => {
      e.preventDefault()
      e.stopPropagation()
      if (wheel_timerRef.current) {
        clearTimeout(wheel_timerRef.current)
        wheel_timerRef.current = null
      }
      wheel_timerRef.current = setTimeout(() => {
        clearTimeout(wheel_timerRef.current)
        wheel_timerRef.current = null
      }, wheelDelay)
      const wrapperEl_Height = wrapperEl.clientHeight
      const contentEl_Height = contentEl.offsetHeight
      if (wrapperEl_Height >= contentEl_Height) {
        contentEl.style.top = '0px'
        return
      }
      const minTop = wrapperEl_Height - contentEl_Height
      const maxTop = 0
      let targetTop = contentEl.offsetTop + delta * (e.deltaY > 0 ? -1 : 1)
      if (targetTop < minTop) {
        targetTop = minTop
      } else if (targetTop > maxTop) {
        targetTop = maxTop
      }
      contentEl.style.top = targetTop + 'px'
    }
    wrapperEl.addEventListener('wheel', wheelCallback, { passive: false })
    return () => {
      wrapperEl.removeEventListener('wheel', wheelCallback)
    }
  }, [delta, wheelDelay])

  useImperativeHandle(ref, () => ({
    scrollUpdate,
    scrollTo
  }), [])

  /**
   * other logic
   */
  const scrollUpdate = () => {
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    const wrapperEl_Height = wrapperEl.clientHeight
    const contentEl_Height = contentEl.offsetHeight
    if (wrapperEl_Height >= contentEl_Height) {
      contentEl.style.top = '0px'
      return
    }
    const minTop = wrapperEl_Height - contentEl_Height
    const maxTop = 0
    let targetTop = contentEl.offsetTop
    if (targetTop < minTop) {
      targetTop = minTop
    } else if (targetTop > maxTop) {
      targetTop = maxTop
    }
    contentEl.style.top = targetTop + 'px'
  }

  const scrollTo = (to = 0, duration = 600, steps = 30) => {
    if (wheel_timerRef.current) {
      return
    }
    const contentEl = contentRef.current
    const targetTop = to * -1
    if (duration <= 0 || steps <= 0) {
      contentEl.style.top = targetTop + 'px'
      return
    }
    const distance = Math.abs(targetTop - contentEl.offsetTop)
    const isDown = targetTop < contentEl.offsetTop
    let delay = duration / steps
    let step = distance / steps
    step = isDown ? step * -1 : step
    if (to_timerRef.current) {
      clearTimeout(to_timerRef.current)
      to_timerRef.current = null
    }
    to_timerRef.current = setInterval(() => {
      let perTop = contentEl.offsetTop + step
      if ((isDown && (perTop <= targetTop)) || (!isDown && (perTop >= targetTop))) {
        contentEl.style.top = targetTop + 'px'
        clearTimeout(to_timerRef.current)
        to_timerRef.current = null
      } else {
        contentEl.style.top = perTop + 'px'
      }
    }, delay)
  }

  return (
    <StyledWrapper ref={wrapperRef}>
      <StyledContent ref={contentRef}>
        {children}
      </StyledContent>
    </StyledWrapper>
  )
}))
