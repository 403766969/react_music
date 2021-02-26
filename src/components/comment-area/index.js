import React, { memo } from 'react'

import Pagination from '@/components/pagination-bar'

import CommentEditor from './c-cpns/comment-editor'
import CommentList from './c-cpns/comment-list'

import { StyledWrapper } from './style'

export default memo(function CommentArea(props) {

  /**
 * props and state
 */
  const { hotCommentList, newCommentList, newCommentCount = 0, currentPage = 1, onPageChange } = props

  return (
    <StyledWrapper className="cpn-comment-area">
      <CommentEditor title="评论" commentCount={newCommentCount} />
      <div className="comment-content">
        {
          hotCommentList && hotCommentList.length > 0 && currentPage === 1 && (
            <CommentList title="精彩评论" commentList={hotCommentList} />
          )
        }
        {
          newCommentList && newCommentList.length > 0 && (
            <CommentList title={`最新评论(${newCommentCount})`} commentList={newCommentList} />
          )
        }
        {
          newCommentList && newCommentCount > 20 && (
            <Pagination currentPage={currentPage} total={newCommentCount} onPageChange={onPageChange} />
          )
        }
      </div>
    </StyledWrapper>
  )
})
