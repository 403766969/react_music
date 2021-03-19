import React, { memo, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatDate } from '@/utils/formatter'
import { renderText } from '@/utils/parser'

import * as playerAction from '@/pages/player/store/actionCreators'

import { StyledWrapper } from './style'

export default memo(function SongItem(props) {

  /**
   * props and state
   */
  const { active, songInfo, sourceLink, kwMatcher } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = () => {
    dispatch(playerAction.add_simpleSong_with_songId(songInfo.id, sourceLink, true))
  }

  const handleAddClick = () => {
    dispatch(playerAction.add_simpleSong_with_songId(songInfo.id, sourceLink, false))
  }

  /**
 　* render logic
 　*/
  let tnsAndAlia = ''
  if (songInfo) {
    const transNames = songInfo.transNames || []
    const alias = songInfo.alias || []
    const temp = [...transNames, ...alias]
    if (temp.length > 0) {
      tnsAndAlia = ' - '
      for (let ta of temp) {
        tnsAndAlia = tnsAndAlia + '(' + ta + ')/'
      }
      tnsAndAlia = tnsAndAlia.slice(0, tnsAndAlia.length - 1)
    }
  }

  let artistTitle = ''
  let divideCount = 0
  if (songInfo && songInfo.artists) {
    const temp = songInfo.artists.reduce((prev, cur) => {
      return prev + cur.name + '/'
    }, '')
    artistTitle = temp.slice(0, temp.length - 1)
    divideCount = songInfo.artists.length - 1
  }

  return songInfo
    ? (
      <StyledWrapper className="cpn-song-item">
        <div className="name">
          <div className="name-content text-nowrap">
            <i className={`sprite_table play-btn ${active ? 'active' : ''}`} title="播放" onClick={handlePlayClick}></i>
            <NavLink className="link" to={`/song?id=${songInfo.id}`} title={songInfo.name + tnsAndAlia}>
              {
                renderText(songInfo.name, kwMatcher)
              }
            </NavLink>
            {
              tnsAndAlia !== '' && (
                <span className="tna" title={tnsAndAlia.slice(3)}>{tnsAndAlia}</span>
              )
            }
            {
              songInfo.mvid !== 0 && (
                <NavLink className="mv" to={`/mv?id=${songInfo.mvid}`} title="mv">
                  <i className="sprite_table"></i>
                </NavLink>
              )
            }
          </div>
        </div>
        <div className="operation">
          <i className="sprite_icon2 btn add" title="添加到播放列表" onClick={handleAddClick}></i>
          <i className="sprite_table btn favor" title="收藏"></i>
          <i className="sprite_table btn share" title="分享"></i>
          <i className="sprite_table btn download" title="下载"></i>
        </div>
        <div className="artist text-nowrap">
          <span title={artistTitle}>
            {
              songInfo.artists && songInfo.artists.map((item, index) => {
                return (
                  <Fragment key={item.id + item.name}>
                    {
                      item.id !== 0
                        ? <NavLink className="link" to={`/artist?id=${item.id}`}>
                          {
                            renderText(item.name, kwMatcher)
                          }
                        </NavLink>
                        : <span>
                          {
                            renderText(item.name, kwMatcher)
                          }
                        </span>
                    }
                    {
                      index < divideCount && (
                        <i>/</i>
                      )
                    }
                  </Fragment>
                )
              })
            }
          </span>
        </div>
        <div className="album text-nowrap">
          {
            songInfo.album && (
              <NavLink className="song-album" to={`/album?id=${songInfo.album.id}`} title={`《${songInfo.album.name}》`}>
                《
                {
                  renderText(songInfo.album.name, kwMatcher)
                }
                》
              </NavLink>
            )
          }
        </div>
        <div className="duration">
          <span>{formatDate(songInfo.duration, 'MM:ss')}</span>
        </div>
      </StyledWrapper>
    )
    : null
})
