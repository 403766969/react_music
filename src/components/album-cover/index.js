import React, { memo } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function AlbumCover(props) {

  /**
   * props and state
   */
  const { albumInfo } = props

  const { name, artist, time } = props

  const { imageWidth = 100, imageHeight = 100, maskWidth = 118, maskHeight = 100 } = props

  const { posX = 0, posY = -570 } = props

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
      <StyledWrapper
        className="cpn-album-cover"
        imageWidth={imageWidth} imageHeight={imageHeight}
        maskWidth={maskWidth} maskHeight={maskHeight}
        posX={posX} posY={posY}>
        <div className="top-cover" onClick={pushRoute_album}>
          <img src={formatUrlWithSize(albumInfo.picUrl, imageWidth, imageHeight, 'y')} alt="" />
          <div className="mask sprite_covor" title={albumInfo.name}></div>
          <i className="play sprite_icon" title="播放"></i>
        </div>
        <div className="bottom-desc">
          {
            name && (
              <div className="name text-nowrap">
                <NavLink to={`/album?id=${albumInfo.id}`} title={albumInfo.name}>{albumInfo.name}</NavLink>
              </div>
            )
          }
          {
            artist && (
              <div className="artist text-nowrap">
                <NavLink to={`/artist?id=${albumInfo.artist.id}`} title={albumInfo.artist.name}>{albumInfo.artist.name}</NavLink>
              </div>
            )
          }
          {
            time && (
              <div className="time text-nowrap">
                <span>{formatDate(albumInfo.publishTime, 'yyyy.M.dd')}</span>
              </div>
            )
          }
        </div>
      </StyledWrapper>
    )
    : null
})
