import React, { memo, useState } from 'react'

import { playerModeTypes } from '@/common/constants'

import { Slider } from 'antd'

import { StyledWrapper } from './style'

export default memo(function PlayerOperation(props) {

  /**
   * props and state
   */
  const { playerMode, volume, songCount } = props

  const { handlePlayerModeToggle, handleVolumeChange, handleVolumeAfterChange, handleListClick } = props

  const [isShowVolume, setIsShowVolume] = useState(false)


  /**
   * other logic
   */
  // 播放模式样式
  let playerModeClass = ''
  let playerModeTitle = ''
  switch (playerMode) {
    case playerModeTypes.LIST_LOOP:
      playerModeClass = 'list-loop'
      playerModeTitle = '列表循环'
      break
    case playerModeTypes.SINGLE_LOOP:
      playerModeClass = 'single-loop'
      playerModeTitle = '单曲循环'
      break
    case playerModeTypes.RANDOM_PLAY:
      playerModeClass = 'random-play'
      playerModeTitle = '随机播放'
      break
    default:
      playerModeClass = 'list-loop'
      playerModeTitle = '列表循环'
      break
  }

  return (
    <StyledWrapper className="cpn-player-operation">
      <div className="operation-left">
        <button className="sprite_playbar btn favor" title="收藏"></button>
        <button className="sprite_playbar btn share" title="分享"></button>
      </div>
      <div className="operation-right">
        <i className="divide sprite_playbar"></i>
        <button className="sprite_playbar btn volume" title="音量(Ctrl+↑/↓)" onClick={() => setIsShowVolume(!isShowVolume)}>
          <div className={`sprite_playbar volume-bar ${isShowVolume ? '' : 'hidden'}`} onClick={e => e.stopPropagation()}>
            <Slider vertical value={volume} onChange={handleVolumeChange} onAfterChange={handleVolumeAfterChange} />
          </div>
        </button>
        <button
          className={`sprite_playbar btn mode ${playerModeClass}`}
          title={`${playerModeTitle}(Ctrl+M)`}
          onClick={handlePlayerModeToggle}></button>
        <button
          className="sprite_playbar btn list"
          title="播放列表(Ctrl+L)"
          onClick={handleListClick}>
          {songCount <= 99 ? songCount : '99+'}
        </button>
      </div>
    </StyledWrapper>
  )
})
