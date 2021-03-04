import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import * as playerAction from '@/pages/player/store/actionCreators'

import ArtistDivide from '@/components/artist-divide'

import { StyledWrapper } from './style'

export default memo(function ListItem(props) {

  /**
   * props and state
   */
  const { index, songInfo, active } = props

  const { showCoverCount } = props

  const { orderConfig, nameConfig, durationConfig, artistConfig, albumConfig } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = () => {
    dispatch(playerAction.add_simpleSong_with_songObject(songInfo, true))
  }

  const handleAddClick = () => {
    dispatch(playerAction.add_simpleSong_with_songObject(songInfo, false))
  }

  /**
   * render logic
   */
  let tnsAndAlia = ''
  if (songInfo) {
    const tns = songInfo.tns || []
    const alia = songInfo.alia || []
    const temp = [...tns, ...alia]
    if (temp.length > 0) {
      tnsAndAlia = ' - '
      for (let ta of temp) {
        tnsAndAlia = tnsAndAlia + '(' + ta + ')/'
      }
      tnsAndAlia = tnsAndAlia.slice(0, tnsAndAlia.length - 1)
    }
  }

  return songInfo
    ? (
      <StyledWrapper className="cpn-list-item">
        {
          orderConfig && (
            <div className="cell order">
              <div className="content text-nowrap">
                <span>{index + 1}</span>
              </div>
            </div>
          )
        }
        {
          nameConfig && (
            <div className="cell name">
              <div className="content">
                {
                  index < showCoverCount && (
                    <NavLink className="song-cover" to={`/song?id=${songInfo.id}`} title={songInfo.name}>
                      <img src={formatUrlWithSize(songInfo.al.picUrl, 50)} alt={songInfo.name} />
                    </NavLink>
                  )
                }
                <i className={`sprite_table play-btn ${active ? 'active' : ''}`} onClick={handlePlayClick}></i>
                <div className="song-info">
                  <div className="song-text text-nowrap">
                    <NavLink className="song-name" to={`/song?id=${songInfo.id}`} title={songInfo.name + tnsAndAlia}>
                      {songInfo.name}
                    </NavLink>
                    {
                      tnsAndAlia !== '' && (
                        <span className="song-tns-alia" title={tnsAndAlia.slice(3)}>{tnsAndAlia}</span>
                      )
                    }
                    {
                      songInfo.mv !== 0 && (
                        <NavLink className="song-mv" to={`/mv?id=${songInfo.mv}`} title="播放mv">
                          <i className="sprite_table"></i>
                        </NavLink>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {
          durationConfig && (
            <div className="cell duration">
              <div className="content text-nowrap">
                <span className="time">{formatDate(songInfo.dt, 'mm:ss')}</span>
              </div>
              <div className="operation">
                <i className="sprite_icon2 btn add" title="添加到播放列表" onClick={handleAddClick}></i>
                <i className="sprite_table btn favor" title="收藏"></i>
                <i className="sprite_table btn share" title="分享"></i>
                <i className="sprite_table btn download" title="下载"></i>
              </div>
            </div>
          )
        }
        {
          artistConfig && (
            <div className="cell artist">
              <div className="content text-nowrap">
                <ArtistDivide artistList={songInfo.ar} />
              </div>
            </div>
          )
        }
        {
          albumConfig && (
            <div className="cell album">
              <div className="content text-nowrap">
                <NavLink className="song-album" to={`/album?id=${songInfo.al.id}`} title={songInfo.al.name}>
                  {songInfo.al.name}
                </NavLink>
              </div>
            </div>
          )
        }
      </StyledWrapper>
    )
    : null
})
