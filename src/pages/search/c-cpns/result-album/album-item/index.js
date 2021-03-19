import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'
import { renderText } from '@/utils/parser'

import * as playerAction from '@/pages/player/store/actionCreators'

import { StyledWrapper } from './style'

export default memo(function AlbumItem(props) {

  /**
   * props and state
   */
  const { albumInfo, kwMatcher } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = e => {
    e.preventDefault()
    let sourceLink = `/album?id=${albumInfo.id}`
    dispatch(playerAction.add_multipleSong_with_albumId(albumInfo.id, sourceLink, true))
  }

  return albumInfo
    ? (
      <StyledWrapper className="cpn-album-item">
        <div className="cover">
          <NavLink to={`/album?id=${albumInfo.id}`} title={albumInfo.name}>
            <img src={formatUrlWithSize(albumInfo.picUrl || albumInfo.blurPicUrl, 130, 130, 'y')} alt="" />
            <span className="sprite_covor mask"></span>
            <i className="play sprite_icon" title="播放" onClick={e => handlePlayClick(e)}></i>
          </NavLink>
        </div>
        <p className="name text-nowrap">
          <NavLink className="link" to={`/album?id=${albumInfo.id}`} title={albumInfo.name}>
            {
              renderText(albumInfo.name, kwMatcher)
            }
          </NavLink>
        </p>
        <p className="artist text-nowrap">
          <NavLink className="link" to={`/album?id=${albumInfo.artist.id}`} title={albumInfo.artist.name}>
            {
              renderText(albumInfo.artist.name, kwMatcher)
            }
          </NavLink>
        </p>
      </StyledWrapper>
    )
    : null
})
