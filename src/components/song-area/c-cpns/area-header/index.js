import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function AreaHeader(props) {

  /**
   * props and state
   */
  const { title, songCount, playCount, link } = props

  return (
    <StyledWrapper className="cpn-area-header">
      <div className="left">
        <h3 className="title">{title}</h3>
        {
          songCount && songCount > 0
            ? (
              <div className="count">{songCount}首歌</div>
            )
            : null
        }
      </div>
      <div className="right">
        {
          link && (
            <div className="link">
              <i className="sprite_icon2"></i>
              <a href={link} title="生成外联播放器" target="_blank" rel="noreferrer">生成外联播放器</a>
            </div>
          )
        }
        {
          playCount && playCount > 0
            ? (
              <div className="count">播放：<span>{playCount}</span>次</div>
            )
            : null
        }
      </div>
    </StyledWrapper>
  )
})
