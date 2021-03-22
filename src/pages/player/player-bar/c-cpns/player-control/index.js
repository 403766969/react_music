import React, { memo } from 'react'

import { audioStatusTypes } from '@/common/constants'

import { StyledWrapper } from './style'

export default memo(function PlayerControl(props) {

  /**
   * props and state
   */
  const { audioStatus } = props

  const { handlePlayClick, handlePrevClick, handleNextClick } = props

  return (
    <StyledWrapper className="cpn-player-control" isPlaying={audioStatus === audioStatusTypes.AUDIO_PLAY}>
      <button className="sprite_playbar btn prev" title="上一首(ctrl+←)" onClick={handlePrevClick}></button>
      <button className="sprite_playbar btn play" title="播放/暂停(ctrl+p)" onClick={handlePlayClick}></button>
      <button className="sprite_playbar btn next" title="下一首(ctrl+→)" onClick={handleNextClick}></button>
    </StyledWrapper>
  )
})
