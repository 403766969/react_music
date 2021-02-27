import React, { memo, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import { Slider } from 'antd'

import ArtistDivide from '@/components/artist-divide'

import { StyledWrapper } from './style'

export default memo(function PlayerContent(props) {

  /**
   * props and state
   */
  const { audio, currentSong, currentTime, setCurrentTime, progessValue, setProgessValue, setIsDragging } = props

  const duration = (currentSong && currentSong.dt) || 0

  /**
   * other logic
   */
  // 拖动进度条
  const handleSliderChange = useCallback(value => {
    setIsDragging(true)
    setCurrentTime(duration * value / 100)
    setProgessValue(value)
  }, [setIsDragging, setCurrentTime, setProgessValue, duration])

  // 拖动进度条完成
  const handleAfterSliderChange = useCallback(value => {
    if (audio) {
      audio.currentTime = duration * value / 100 / 1000
      setCurrentTime(duration * value / 100)
      setIsDragging(false)
    }
  }, [setCurrentTime, setIsDragging, audio, duration])

  return (
    <StyledWrapper className="cpn-player-content">
      <div className="song-cover">
        {
          currentSong
            ? (
              <NavLink className="song-link" to={`/song?id=${currentSong.id}`} title={currentSong.name}>
                <img src={formatUrlWithSize(currentSong.al.picUrl, 34)} alt="" />
                <div className="sprite_playbar mask"></div>
              </NavLink>
            )
            : (
              <div className="song-link">
                <img src={require('@/assets/img/default_album.jpg').default} alt="" />
                <div className="sprite_playbar mask"></div>
              </div>
            )
        }
      </div>
      <div className="song-main">
        <div className="song-info">
          <div className="song-name text-nowrap">
            {
              currentSong && (
                <NavLink
                  to={`/song?id=${currentSong.id}`}
                  title={currentSong.name}>{currentSong.name}</NavLink>
              )
            }
          </div>
          <div className="song-artist text-nowrap">
            {
              currentSong && (
                <ArtistDivide artistList={currentSong.ar} />
              )
            }
          </div>
        </div>
        <div className="song-progress">
          <div className="song-slider">
            <Slider
              step={0.1}
              tipFormatter={null}
              value={progessValue}
              onChange={handleSliderChange}
              onAfterChange={handleAfterSliderChange}
              disabled={currentSong === undefined || currentSong === null} />
          </div>
          <div className="song-time">
            <span className="now-time">{formatDate(currentTime, 'mm:ss')}</span>
            <span className="divider">/</span>
            <span className="total-time">{formatDate(duration, 'mm:ss')}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
})
