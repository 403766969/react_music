import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import { Slider } from 'antd'

import ArtistDivide from '@/components/artist-divide'

import { StyledWrapper } from './style'

export default memo(function PlayerContent(props) {

  /**
   * props and state
   */
  const { currentSong, duration, currentTime, progessValue } = props

  const { handleSliderChange, handleSliderAfterChange } = props

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
              onAfterChange={handleSliderAfterChange}
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
