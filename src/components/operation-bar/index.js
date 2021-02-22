import React, { memo } from 'react'

import { StyleWrapper } from './style'

export default memo(function OperationBar(props) {

  /**
   * props and state
   */
  const { favorText, shareText, downloadText, commentText } = props
  const { onPlayClick, onAddClick } = props

  /**
   * other logic
   */
  const handlePlayClick = () => {
    if (onPlayClick && typeof onPlayClick === 'function') {
      onPlayClick()
    }
  }

  const handleAddClick = () => {
    if (onAddClick && typeof onAddClick === 'function') {
      onAddClick()
    }
  }

  return (
    <StyleWrapper className="cpn-operation-bar">
      <div className="left">
        <button className="play sprite_button" title="播放" onClick={handlePlayClick}>
          <i className="sprite_button"></i>
          <span>播放</span>
        </button>
        <button className="add sprite_button" title="添加到播放列表" onClick={handleAddClick}>
          <i className="sprite_button"></i>
        </button>
      </div>
      <div className="right">
        <button className="favor sprite_button" title="收藏">
          <i className="sprite_button"></i>
          {
            favorText
              ? <span className="text">({favorText})</span>
              : <span className="text-default">收藏</span>
          }
        </button>
        <button className="share sprite_button" title="分享">
          <i className="sprite_button"></i>
          {
            shareText
              ? <span className="text">({shareText})</span>
              : <span className="text-default">分享</span>
          }
        </button>
        <button className="download sprite_button" title="下载">
          <i className="sprite_button"></i>
          {
            downloadText
              ? <span className="text">({downloadText})</span>
              : <span className="text-default">下载</span>
          }
        </button>
        <button className="comment sprite_button" title="评论">
          <i className="sprite_button"></i>
          {
            commentText
              ? <span className="text">({commentText})</span>
              : <span className="text-default">评论</span>
          }
        </button>
      </div>
    </StyleWrapper>
  )
})
