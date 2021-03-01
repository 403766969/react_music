import React, { memo } from 'react'

import { formatUrlWithSize } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function BaseInfo(props) {

  /**
   * props and state
   */
  const { baseInfo } = props

  return baseInfo
    ? (
      <StyledWrapper className="cpn-base-info">
        <div className="artist-info">
          <h2 className="artist-name text-nowrap">{baseInfo.name}</h2>
          <h3 className="artist-alias text-nowrap">
            {
              baseInfo.alias && baseInfo.alias.join(' / ')
            }
          </h3>
        </div>
        <div className="artist-cover">
          <img src={formatUrlWithSize(baseInfo.picUrl, 640, 300, 'y')} alt="" />
          <div className="mask"></div>
          <i className="sprite_icon favor"></i>
        </div>
      </StyledWrapper>
    )
    : null
})

