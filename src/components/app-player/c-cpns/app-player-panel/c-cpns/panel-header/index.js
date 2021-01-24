import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import { action_clear_state } from '../../../../store/acitonCreators'

import {
  StyledWrapper,
  StyledLeft,
  StyledRight
} from './style'

export default memo(function PanelHeader(props) {

  /**
   * props and state
   */
  const { songList = [], currentSong = {} } = props

  const { handleCloseClick: hccCallback } = props

  /**
   * redux hooks
   */

  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handleClearClick = () => {
    dispatch(action_clear_state())
  }

  const handleCloseClick = () => {
    if (hccCallback && typeof hccCallback === 'function') {
      hccCallback()
    }
  }

  return (
    <StyledWrapper>
      <StyledLeft>
        <h3 className="title">播放列表({songList.length})</h3>
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
      </StyledLeft>
      <StyledRight>
        <p className="song-name">{currentSong.name}</p>
        <i className="sprite_playlist close" title="关闭" onClick={handleCloseClick}></i>
      </StyledRight>
    </StyledWrapper>
  )
})
