import React, { memo } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function AlbumCover(props) {

  /**
   * props and state
   */
  const { albumInfo } = props

  const { imageWidth = '100', imageHeight = '100', coverWidth = '118', coverHeight = '100' } = props

  const { backgroundPosition = '-570' } = props

  /**
   * other hooks
   */
  const history = useHistory()

  /**
   * other logic
   */
  const pushRoute_album = () => {
    history.push(`/album?id=${albumInfo.id}`)
  }

  return albumInfo
    ? (
      <StyledWrapper className="cpn-album-cover" imageWidth={imageWidth} imageHeight={imageHeight} coverWidth={coverWidth} coverHeight={coverHeight} backgroundPosition={backgroundPosition}>
        <div className="top-cover" onClick={pushRoute_album}>
          <img src={formatUrlWithSize(albumInfo.picUrl, 150)} alt="" />
          <div className="mask sprite_covor" title={albumInfo.name}></div>
          <i className="play sprite_icon" title="播放"></i>
        </div>
        <div className="bottom-desc">
          <div className="name text-nowrap">
            <NavLink to={`/album?id=${albumInfo.id}`} title={albumInfo.name}>{albumInfo.name}</NavLink>
          </div>
          <div className="artist text-nowrap">
            <NavLink to={`/artist?id=${albumInfo.artist.id}`} title={albumInfo.artist.name}>{albumInfo.artist.name}</NavLink>
          </div>
        </div>
      </StyledWrapper>
    )
    : null
})
