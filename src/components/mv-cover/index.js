import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function MvCover(props) {

  /**
   * props and state
   */
  const { mvInfo } = props

  const { name } = props

  const { imageWidth = 137, imageHeight = 103 } = props

  const { posX = 0, posY = -1170 } = props

  return mvInfo
    ? (
      <StyledWrapper
        className="cpn-mv-cover"
        imageWidth={imageWidth} imageHeight={imageHeight}
        posX={posX} posY={posY}>
        <div className="mv-cover">
          <NavLink to={`/mv?id=${mvInfo.id}`} title={mvInfo.name}>
            <img src={formatUrlWithSize(mvInfo.imgurl, imageWidth, imageHeight, 'y')} alt="" />
            <div className="mask sprite_covor"></div>
            <i className="play sprite_icon" title="播放"></i>
          </NavLink>
        </div>
        <div className="mv-desc">
          {
            name && (
              <div className="name text-nowrap">
                <NavLink to={`/mv?id=${mvInfo.id}`} title={mvInfo.name}>{mvInfo.name}</NavLink>
              </div>
            )
          }
        </div>
      </StyledWrapper>
    )
    : null
})
