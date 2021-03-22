import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function PlayerHeader(props) {

  /**
   * props and state
   */
  const { songCount, currentSongName } = props

  const { handleClearClick, handleCloseClick } = props

  return (
    <StyledWrapper className="cpn-player-header">
      <div className="left">
        <h3 className="title">播放列表({songCount})</h3>
        <div className="operator">
          <button title="收藏全部">
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <span className="divide"></span>
          <button title="清除" onClick={handleClearClick}>
            <i className="sprite_playlist icon clear"></i>
            清除
          </button>
        </div>
      </div>
      <div className="right">
        <p className="song-name text-nowrap">{currentSongName}</p>
        <i className="sprite_playlist close" title="关闭" onClick={handleCloseClick}></i>
      </div>
    </StyledWrapper>
  )
})
