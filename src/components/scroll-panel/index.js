import React, { memo, forwardRef, useRef, useEffect, useImperativeHandle } from 'react'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(forwardRef(function ScrollPanel(props, ref) {

  /**
   * props and state
   */
  const { children, delta = 55 } = props

  /**
   * other hooks
   */
  const wrapperRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    if (!wrapperEl || !contentEl) {
      return
    }
    const wheelCallback = e => {
      e.preventDefault()
      e.stopPropagation()
      const wrapperEl_clientHeight = wrapperEl.clientHeight
      const contentEl_clientHeight = contentEl.clientHeight
      if (wrapperEl_clientHeight >= contentEl_clientHeight) {
        contentEl.style.top = '0px'
        return
      }
      const contentEl_minTop = wrapperEl.clientHeight - contentEl.clientHeight
      const contentEl_offsetTop = contentEl.offsetTop
      let targetTop = contentEl_offsetTop + delta * (e.deltaY > 0 ? -1 : 1)
      if (targetTop > 0) {
        targetTop = 0
      } else if (targetTop < contentEl_minTop) {
        targetTop = contentEl_minTop
      }
      contentEl.style.top = targetTop + 'px'
    }
    wrapperEl.addEventListener('wheel', wheelCallback, { passive: false })
    return () => {
      wrapperEl.removeEventListener('wheel', wheelCallback)
    }
  }, [delta])

  useImperativeHandle(ref, () => ({
    scrollUpdate
  }), [])

  /**
   * other logic
   */
  const scrollUpdate = () => {
    const wrapperEl = wrapperRef.current
    const contentEl = contentRef.current
    if (!wrapperEl || !contentEl) {
      return
    }
    const wrapperEl_clientHeight = wrapperEl.clientHeight
    const contentEl_clientHeight = contentEl.clientHeight
    if (wrapperEl_clientHeight >= contentEl_clientHeight) {
      contentEl.style.top = '0px'
      return
    }
    const contentEl_minTop = wrapperEl.clientHeight - contentEl.clientHeight
    const contentEl_offsetTop = contentEl.offsetTop
    let targetTop = contentEl_offsetTop
    if (targetTop > 0) {
      targetTop = 0
    } else if (targetTop < contentEl_minTop) {
      targetTop = contentEl_minTop
    }
    contentEl.style.top = targetTop + 'px'
  }

  return (
    <StyledWrapper ref={wrapperRef}>
      <StyledContent ref={contentRef}>
        {children}
      </StyledContent>
    </StyledWrapper>
  )
}))
