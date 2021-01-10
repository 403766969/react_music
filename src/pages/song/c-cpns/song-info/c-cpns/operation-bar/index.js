import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import {
  action_play_song,
  action_increase_song
} from '@/components/app-player/store/acitonCreators'

import {
  StyleWrapper,
  StyleLeft,
  StyleRight
} from './style'

export default memo(function OperationBar(props) {
  const { songId } = props

  const dispatch = useDispatch()

  const handlePlay = () => {
    dispatch(action_play_song(songId))
  }

  const handleAdd = () => {
    dispatch(action_increase_song(songId))
  }

  return (
    <StyleWrapper>
      <StyleLeft>
        <button className="play sprite_button" title="播放" onClick={handlePlay}>
          <i className="sprite_button"></i>
          <span>播放</span>
        </button>
        <button className="add sprite_button" title="添加到播放列表" onClick={handleAdd}>
          <i className="sprite_button"></i>
        </button>
      </StyleLeft>
      <StyleRight>
        <button className="favor sprite_button" title="收藏">
          <i className="sprite_button"></i>
          <span>收藏</span>
        </button>
        <button className="share sprite_button" title="分享">
          <i className="sprite_button"></i>
          <span>分享</span>
        </button>
        <button className="download sprite_button" title="下载">
          <i className="sprite_button"></i>
          <span>下载</span>
        </button>
        <button className="comment sprite_button" title="评论">
          <i className="sprite_button"></i>
          <span>评论</span>
        </button>
      </StyleRight>
    </StyleWrapper>
  )
})
