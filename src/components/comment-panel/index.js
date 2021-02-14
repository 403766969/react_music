import React, { memo, useState, useEffect, useCallback, useRef } from 'react'

import Pagination from '@/components/pagination-bar'

import CommentEditor from './c-cpns/comment-editor'
import CommentList from './c-cpns/comment-list'

import { StyledWrapper } from './style'

export default memo(function CommentPanel(props) {

  /**
   * props and state
   */
  const { hotComment = [], newComment = [], pageSize = 20, itemCount = 9, onPageChange } = props
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * other hooks
   */
  const panelRef = useRef()

  /**
   * other logic
   */
  useEffect(() => {
    setCurrentPage(1)
  }, [onPageChange])

  const handlePageChange = useCallback(page => {
    setCurrentPage(page)
    window.scrollTo(0, panelRef.current.offsetTop + 100)
    if (onPageChange && typeof onPageChange === 'function') {
      onPageChange(page)
    }
  }, [onPageChange])

  return (
    <StyledWrapper className="cpn-comment-panel" ref={panelRef}>
      <CommentEditor title="评论" commentTotal={newComment.total} />
      {
        currentPage === 1 && (
          <CommentList title="精彩评论" listData={hotComment.list} />
        )
      }
      <CommentList title={`最新评论(${newComment.total || 0})`} listData={newComment.list} />
      <Pagination current={currentPage} total={newComment.total} pageSize={pageSize} itemCount={itemCount} onChange={handlePageChange} />
    </StyledWrapper>
  )
})
