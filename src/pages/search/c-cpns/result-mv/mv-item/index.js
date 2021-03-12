import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatCount, formatDate } from '@/utils/formatter'
import { renderText } from '@/utils/parser'

import { StyledWrapper } from './style'

export default memo(function MvItem(props) {

  /**
   * props and state
   */
  const { mvInfo, kwMatcher } = props

  return mvInfo
    ? (
      <StyledWrapper className="cpn-mv-item">
        <div className="cover">
          <NavLink to={`/mv?id=${mvInfo.id}`} title={mvInfo.name}>
            <img src={formatUrlWithSize(mvInfo.cover, 159, 90, 'y')} alt="" />
            <div className="mask">
              <span className="count">
                <i className="sprite_icon3 icon"></i>
                {formatCount(mvInfo.playCount)}
              </span>
            </div>
            <p className="duration">{formatDate(mvInfo.duration, 'mm:ss')}</p>
          </NavLink>
        </div>
        <p className="name text-nowrap">
          <NavLink className="link" to={`/mv?id=${mvInfo.id}`} title={mvInfo.name}>
            {
              renderText(mvInfo.name, kwMatcher)
            }
          </NavLink>
        </p>
        <p className="artist text-nowrap">
          <NavLink className="link" to={`/artist?id=${mvInfo.artistId}`} title={mvInfo.artistName}>
            {
              renderText(mvInfo.artistName, kwMatcher)
            }
          </NavLink>
        </p>
      </StyledWrapper>
    )
    : null
})
