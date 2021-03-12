import React, { memo } from 'react'

import { formatDate, formatCount } from '@/utils/formatter'

import HeaderShort from '@/components/header-short'

import { StyledWrapper } from './style'

export default memo(function MvDesc(props) {

  /**
   * props and state
   */
  const { mvDetail } = props

  return mvDetail
    ? (
      <StyledWrapper className="cpn-mv-desc">
        <HeaderShort title="MV简介" />
        <div className="content">
          <div className="info">
            <p className="time">发布时间：{formatDate(mvDetail.publishTime, 'yyyy-MM-dd')}</p>
            <p className="count">播放次数：{formatCount(mvDetail.playCount)}次</p>
          </div>
          {
            (mvDetail.briefDesc || mvDetail.desc) && (
              <div className="intro">
                <p className="brief">{mvDetail.briefDesc}</p>
                <p className="desc">{mvDetail.desc}</p>
              </div>
            )
          }
        </div>
      </StyledWrapper>
    )
    : null
})
