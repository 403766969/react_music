import React, { memo, useState, useEffect, useCallback } from 'react'

import { playerModeTypes } from '@/common/constants'

import { Slider } from 'antd'

import { StyledWrapper } from './style'

export default memo(function PlayerOperation(props) {

  /**
   * props and state
   */
  const { audio, playerMode, setPlayerMode, setIsShowPanel, songList } = props

  const [volume, setVolume] = useState(() => {
    const s_volume = window.localStorage.getItem('volume')
    return s_volume ? Number(s_volume) : 50
  })
  const [isShowVolume, setIsShowVolume] = useState(false)

  /**
   * other logic
   */
  // 初始化音量
  useEffect(() => {
    if (audio) {
      setVolume(volume => {
        audio.volume = volume / 100
        return volume
      })
    }
  }, [audio])

  // 调节音量
  const handleVolumeChange = useCallback(value => {
    if (audio) {
      setVolume(() => {
        audio.volume = value / 100
        return value
      })
    }
  }, [audio])

  // 调节音量完成
  const handleAfterVolumeChange = useCallback(value => {
    window.localStorage.setItem('volume', value)
  }, [])

  // 切换播放模式
  const handlePlayerModeToggle = () => {
    let newPlayerMode = ''
    switch (playerMode) {
      case playerModeTypes.LIST_LOOP:
        newPlayerMode = playerModeTypes.SINGLE_LOOP
        break
      case playerModeTypes.SINGLE_LOOP:
        newPlayerMode = playerModeTypes.RANDOM_PLAY
        break
      case playerModeTypes.RANDOM_PLAY:
        newPlayerMode = playerModeTypes.LIST_LOOP
        break
      default:
        newPlayerMode = playerModeTypes.LIST_LOOP
        break
    }
    setPlayerMode(newPlayerMode)
    window.localStorage.setItem('playerMode', newPlayerMode)
  }

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

  // 显示/隐藏播放列表
  const handleListClick = () => {
    setIsShowPanel(isShowPanel => {
      return !isShowPanel
    })
  }

  return (
    <StyledWrapper className="cpn-player-operation">
      <div className="operation-left">
        <button className="sprite_playbar btn favor" title="收藏"></button>
        <button className="sprite_playbar btn share" title="分享"></button>
      </div>
      <div className="operation-right">
        <i className="divide sprite_playbar"></i>
        <button className="sprite_playbar btn volume" title="音量" onClick={() => setIsShowVolume(!isShowVolume)}>
          <div className={`sprite_playbar volume-bar ${isShowVolume ? '' : 'hidden'}`} onClick={e => e.stopPropagation()}>
            <Slider vertical value={volume} onChange={handleVolumeChange} onAfterChange={handleAfterVolumeChange} />
          </div>
        </button>
        <button
          className={`sprite_playbar btn mode ${playerModeClass}`}
          title={playerModeTitle}
          onClick={handlePlayerModeToggle}></button>
        <button
          className="sprite_playbar btn list"
          title="播放列表"
          onClick={handleListClick}>
          {songList ? (songList.length <= 99 ? songList.length : '99+') : 0}
        </button>
      </div>
    </StyledWrapper>
  )
})
