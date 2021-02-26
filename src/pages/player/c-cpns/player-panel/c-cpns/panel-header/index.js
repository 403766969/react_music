import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../../../../store/acitonCreators'

import { StyledWrapper } from './style'

export default memo(function PanelHeader(props) {

  /**
   * props and state
   */
  const { songCount, songName, onCloseClick } = props

  /**
   * redux hooks
   */

  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handleClearClick = () => {
    dispatch(actions.clear_List())
  }

  const handleCloseClick = () => {
    if (onCloseClick && typeof onCloseClick === 'function') {
      onCloseClick()
    }
  }

  return (
    <StyledWrapper className="cpn-panel-header">
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
        <p className="song-name text-nowrap">{songName}</p>
        <i className="sprite_playlist close" title="关闭" onClick={handleCloseClick}></i>
      </div>
    </StyledWrapper>
  )
})
