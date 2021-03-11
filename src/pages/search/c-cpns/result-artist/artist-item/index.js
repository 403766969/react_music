import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'
import { renderText } from '@/utils/parser'

import { StyledWrapper } from './style'

export default memo(function ArtistItem(props) {

  /**
   * props and state
   */
  const { artistInfo, kwMatcher } = props

  return artistInfo
    ? (
      <StyledWrapper className="cpn-artist-item">
        <div className="cover">
          <NavLink to={`/artist?id=${artistInfo.id}`} title={artistInfo.name}>
            <img src={formatUrlWithSize(artistInfo.img1v1Url || artistInfo.picUrl, 130, 130, 'y')} alt="" />
            <span className="sprite_covor mask"></span>
          </NavLink>
        </div>
        <p className="desc text-nowrap">
          <NavLink className="link" to={`/artist?id=${artistInfo.id}`} title={artistInfo.name}>
            {
              renderText(artistInfo.name, kwMatcher)
            }
          </NavLink>
        </p>
      </StyledWrapper>
    )
    : null
})
