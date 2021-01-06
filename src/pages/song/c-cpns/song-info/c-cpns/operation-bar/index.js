import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import { setCurrentSongAction } from '@/components/app-player/store/acitonCreators'

import {
  StyleWrapper,
  StyleLeft,
  StyleRight
} from './style'

export default memo(function OperationBar(props) {
  const { showSong } = props

  const dispatch = useDispatch()

  const handlePlay = () => {
    dispatch(setCurrentSongAction(showSong))
  }

  return (
    <StyleWrapper>
      <StyleLeft>
        <button className="play sprite_button" title="播放" onClick={handlePlay}>
          <i className="sprite_button"></i>
          <span>播放</span>
        </button>
        <button className="add sprite_button" title="添加到播放列表">
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
