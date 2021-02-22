import React, { memo } from 'react'

import ListItem from './c-cpns/list-item'

import { StyledWrapper } from './style'

export default memo(function CommentList(props) {

  /**
   * props and state
   */
  const { title = '评论', cpnData = [] } = props

  return (
    <StyledWrapper className="cpn-comment-list">
      <h3 className="title">{title}</h3>
      <ul className="list-content">
        {
          cpnData.map(item => {
            return (
              <ListItem key={item.commentId} cpnData={item} />
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
