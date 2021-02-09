import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import {
  action_increase_song,
  action_increase_songList_with_songsheetId
} from '@/pages/player/store/acitonCreators'

import { StyleWrapper } from './style'

export default memo(function OperationBar(props) {

  /**
   * props and state
   */
  const { songId, songsheetId } = props
  const { favorText = '收藏', shareText = '分享', downloadText = '下载', commentText = '评论' } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlay = () => {
    if (songId) {
      dispatch(action_increase_song(songId, true))
    } else if (songsheetId) {
      dispatch(action_increase_songList_with_songsheetId(songsheetId, true))
    }
  }

  const handleAdd = () => {
    if (songId) {
      dispatch(action_increase_song(songId, false))
    } else if (songsheetId) {
      dispatch(action_increase_songList_with_songsheetId(songsheetId, false))
    }
  }

  return (
    <StyleWrapper className="cpn-operation-bar">
      <div className="left">
        <button className="play sprite_button" title="播放" onClick={handlePlay}>
          <i className="sprite_button"></i>
          <span>播放</span>
        </button>
        <button className="add sprite_button" title="添加到播放列表" onClick={handleAdd}>
          <i className="sprite_button"></i>
        </button>
      </div>
      <div className="right">
        <button className="favor sprite_button" title="收藏">
          <i className="sprite_button"></i>
          <span>{favorText}</span>
        </button>
        <button className="share sprite_button" title="分享">
          <i className="sprite_button"></i>
          <span>{shareText}</span>
        </button>
        <button className="download sprite_button" title="下载">
          <i className="sprite_button"></i>
          <span>{downloadText}</span>
        </button>
        <button className="comment sprite_button" title="评论">
          <i className="sprite_button"></i>
          <span>{commentText}</span>
        </button>
      </div>
    </StyleWrapper>
  )
})
