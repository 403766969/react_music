import React, { memo } from 'react'

import ArtistDivide from '@/components/artist-divide'
import LoadingSpin from '@/components/loading-spin'

import { StyledWrapper } from './style'

export default memo(function MvDetail(props) {

  /**
   * props and state
   */
  const { mvDetail, mvUrl, isLoading } = props

  return isLoading
    ? (
      <LoadingSpin text="加载中" />
    )
    : (mvDetail
      ? (
        <StyledWrapper className="cpn-mv-detial">
          <div className="header">
            <i className="sprite_icon3 mv-icon"></i>
            <h2 className="title" title={mvDetail.name}>{mvDetail.name}</h2>
            <div className="artists">
              <ArtistDivide artistList={mvDetail.artists} divide={' / '} />
            </div>
          </div>
          <div className="content">
            <video src={mvUrl || ''} poster={mvDetail.cover} controls></video>
          </div>
          <div className="operation">
            <button className="sprite_button favor btn" title="收藏">
              <i className="sprite_button border"></i>
              <span>({mvDetail.subCount})</span>
            </button>
            <button className="sprite_button share btn" title="分享">
              <i className="sprite_button border"></i>
              <span>({mvDetail.shareCount})</span>
            </button>
          </div>
        </StyledWrapper>
      )
      : null
    )
})
