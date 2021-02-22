import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function AreaHeader(props) {

  /**
   * props and state
   */
  const { title = '歌曲列表', cpnData = {} } = props

  return (
    <StyledWrapper className="cpn-area-header">
      <div className="left">
        <h3 className="title">{title}</h3>
        {
          cpnData.songCount && (
            <div className="count">{cpnData.songCount}首歌</div>
          )
        }
      </div>
      <div className="right">
        {
          cpnData.songsheetId && (
            <div className="link">
              <i className="sprite_icon2"></i>
              <a href={`https://music.163.com/#/outchain/0/${cpnData.songsheetId}`} title="生成外联播放器" target="_blank" rel="noreferrer">生成外联播放器</a>
            </div>
          )
        }
        {
          cpnData.playCount && (
            <div className="count">播放：<span>{cpnData.playCount}</span>次</div>
          )
        }
      </div>
    </StyledWrapper>
  )
})
