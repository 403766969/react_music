import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function PaginationBar(props) {

  /**
   * props and state
   */
  const { current = 1, total = 0, pageSize = 20, itemCount = 9, fastStep = 5, onChange } = props

  /**
   * other logic
   */
  const total_show = total > 0 ? total : 0
  const pageSize_show = pageSize > 0 ? pageSize : 10
  const itemCount_show = itemCount < 3 ? 3 : itemCount % 2 === 0 ? itemCount + 1 : itemCount
  const pageCount_show = Math.ceil(total_show / pageSize_show)

  /**
   * render logic
   */
  const liEls = []

  let midEls = []
  let startEl = null
  let endEl = null
  let prevEl = null
  let nextEl = null
  let rewindEl = null
  let forwardEl = null

  if (pageCount_show >= 2) {
    startEl = <li className={`pagination-item ${current === 1 ? 'active' : ''}`} key={1} onClick={() => handleItemClick(1)}>{1}</li>
    endEl = <li className={`pagination-item ${current === pageCount_show ? 'active' : ''}`} key={pageCount_show} onClick={() => handleItemClick(pageCount_show)}>{pageCount_show}</li>
    prevEl = <li className={`pagination-prev ${current === 1 ? 'disable' : ''}`} key="prev" onClick={() => handlePrevClick()}>上一页</li>
    nextEl = <li className={`pagination-next ${current === pageCount_show ? 'disable' : ''}`} key="next" onClick={() => handleNextClick()}>下一页</li>
  }

  if (pageCount_show >= 3 && pageCount_show <= itemCount_show) {
    for (let index = 2; index <= pageCount_show - 1; index++) {
      midEls.push(<li className={`pagination-item ${current === index ? 'active' : ''}`} key={index} onClick={() => handleItemClick(index)}>{index}</li>)
    }
  } else if (pageCount_show >= 3 && pageCount_show > itemCount_show) {
    const half = (itemCount_show - 3) / 2
    let midStart = current - half
    let midEnd = current + half
    if (midStart <= 2) {
      midStart = 2
      midEnd = midStart + half * 2
      forwardEl = (
        <li className="pagination-forward" key="forward">
          <span>•••</span>
          <i onClick={() => handleForwardClick()}>&gt;&gt;</i>
        </li>
      )
    } else if (midEnd >= pageCount_show - 1) {
      midEnd = pageCount_show - 1
      midStart = midEnd - half * 2
      rewindEl = (
        <li className="pagination-rewind" key="rewind">
          <span>•••</span>
          <i onClick={() => handleRewindClick()}>&lt;&lt;</i>
        </li>
      )
    } else {
      rewindEl = (
        <li className="pagination-rewind" key="rewind">
          <span>•••</span>
          <i onClick={() => handleRewindClick()}>&lt;&lt;</i>
        </li>
      )
      forwardEl = (
        <li className="pagination-forward" key="forward">
          <span>•••</span>
          <i onClick={() => handleForwardClick()}>&gt;&gt;</i>
        </li>
      )
    }
    for (let index = midStart; index <= midEnd; index++) {
      midEls.push(<li className={`pagination-item ${current === index ? 'active' : ''}`} key={index} onClick={() => handleItemClick(index)}>{index}</li>)
    }
  }

  liEls.push(prevEl, startEl, rewindEl, ...midEls, forwardEl, endEl, nextEl)

  /**
   * event logic
   */
  const handleItemClick = index => {
    if (index === current) {
      return
    }
    if (onChange && typeof onChange === 'function') {
      onChange(index, pageSize_show)
    }
  }

  const handlePrevClick = () => {
    if (current === 1) {
      return
    }
    if (onChange && typeof onChange === 'function') {
      onChange(current - 1, pageSize_show)
    }
  }

  const handleNextClick = () => {
    if (current === pageCount_show) {
      return
    }
    if (onChange && typeof onChange === 'function') {
      onChange(current + 1, pageSize_show)
    }
  }

  const handleRewindClick = () => {
    let index = current - fastStep
    if (index < 1) {
      index = 1
    }
    if (onChange && typeof onChange === 'function') {
      onChange(index, pageSize_show)
    }
  }

  const handleForwardClick = () => {
    let index = current + fastStep
    if (index > pageCount_show) {
      index = pageCount_show
    }
    if (onChange && typeof onChange === 'function') {
      onChange(index, pageSize_show)
    }
  }

  return (
    <StyledWrapper className="cpn-pagination-bar">
      <ul className="pagination-content">
        {
          liEls
        }
      </ul>
    </StyledWrapper>
  )
})
