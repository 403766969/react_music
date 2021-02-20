import React, { memo } from 'react'

import Pagination from '@/components/pagination-bar'

import CommentEditor from './c-cpns/comment-editor'
import CommentList from './c-cpns/comment-list'

import { StyledWrapper } from './style'

export default memo(function CommentArea(props) {

  /**
 * props and state
 */
  const { hotComment = {}, newComment = {}, currentPage = 1, onPageChange } = props

  return (
    <StyledWrapper className="cpn-comment-area">
      <CommentEditor title="评论" commentTotal={newComment.total || 0} />
      <div className="comment-content">
        {
          hotComment.list && hotComment.list.length > 0 && currentPage === 1 && (
            <CommentList title="精彩评论" commentList={hotComment.list} />
          )
        }
        {
          newComment.list && newComment.list.length > 0 && (
            <CommentList title={`最新评论(${newComment.total || 0})`} commentList={newComment.list} />
          )
        }
        {
          newComment.list && newComment.total > 20 && (
            <Pagination currentPage={currentPage} total={newComment.total} onPageChange={onPageChange} />
          )
        }
      </div>
    </StyledWrapper>
  )
})
