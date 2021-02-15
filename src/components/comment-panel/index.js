import React, { memo } from 'react'

import Pagination from '@/components/pagination-bar'

import CommentEditor from './c-cpns/comment-editor'
import CommentList from './c-cpns/comment-list'

import { StyledWrapper } from './style'

export default memo(function CommentPanel(props) {

  /**
   * props and state
   */
  const { hotComment = {}, newComment = {}, currentPage = 1, pageSize = 20, itemCount = 9, onPageChange } = props

  return (
    <StyledWrapper className="cpn-comment-panel">
      <CommentEditor title="评论" commentTotal={newComment.total} />
      {
        Object.keys(hotComment).length > 0 && currentPage === 1 && (
          <CommentList title="精彩评论" listData={hotComment.list} />
        )
      }
      {
        Object.keys(newComment).length > 0 && (
          <CommentList title={`最新评论(${newComment.total || 0})`} listData={newComment.list} />
        )
      }
      {
        Object.keys(newComment).length > 0 && (
          <Pagination currentPage={currentPage} total={newComment.total} pageSize={pageSize} itemCount={itemCount} onPageChange={onPageChange} />
        )
      }
    </StyledWrapper>
  )
})
