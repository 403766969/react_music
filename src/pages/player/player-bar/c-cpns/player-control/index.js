import React, { memo } from 'react'

import { audioStatusTypes } from '@/common/constants'

import { StyledWrapper } from './style'

export default memo(function PlayerControl(props) {

  /**
   * props and state
   */
  const { audio, audioStatus, audioPause, audioPlay, songToggle } = props

  /**
   * other logic
   */
  const hanldePrevClick = () => {
    songToggle(-1)
  }

  const hanldeNextClick = () => {
    songToggle(1)
  }

  const hanldePlayClick = () => {
    if (audio) {
      if (audio.paused) {
        audioPlay()
      } else {
        audioPause()
      }
    }
  }

  return (
    <StyledWrapper className="cpn-player-control" isPlaying={audioStatus === audioStatusTypes.AUDIO_PLAY}>
      <button className="sprite_playbar btn prev" title="上一首(ctrl+←)" onClick={hanldePrevClick}></button>
      <button className="sprite_playbar btn play" title="播放/暂停(ctrl+p)" onClick={hanldePlayClick}></button>
      <button className="sprite_playbar btn next" title="下一首(ctrl+→)" onClick={hanldeNextClick}></button>
    </StyledWrapper>
  )
})
