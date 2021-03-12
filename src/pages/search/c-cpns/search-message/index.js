import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function SearchMessage(props) {

  /**
   * props and state
   */
  const { keywords, type, songCount, artistCount, albumCount, songsheetCount, mvCount } = props

  return (
    <StyledWrapper className="cpn-search-message">
      {
        type === 'song' && (
          <p>
            搜索 “
            <span className="message-keywords">{keywords}</span>
            ” ，找到
            <span className="message-count"> {songCount} </span>
            首单曲
          </p>
        )
      }
      {
        type === 'artist' && (
          <p>
            搜索 “
            <span className="message-keywords">{keywords}</span>
            ” ，找到
            <span className="message-count"> {artistCount} </span>
            位歌手
          </p>
        )
      }
      {
        type === 'album' && (
          <p>
            搜索 “
            <span className="message-keywords">{keywords}</span>
            ” ，找到
            <span className="message-count"> {albumCount} </span>
            张专辑
          </p>
        )
      }
      {
        type === 'songsheet' && (
          <p>
            搜索 “
            <span className="message-keywords">{keywords}</span>
            ” ，找到
            <span className="message-count"> {songsheetCount} </span>
            个歌单
          </p>
        )
      }
      {
        type === 'mv' && (
          <p>
            搜索 “
            <span className="message-keywords">{keywords}</span>
            ” ，找到
            <span className="message-count"> {mvCount} </span>
            个MV
          </p>
        )
      }
    </StyledWrapper>
  )
})
