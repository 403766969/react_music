import React, { memo } from 'react'

import {
  formatUrlWithSize,
  formatDate
} from '@/utils/formatter'

import OperationBar from '@/components/operation-bar'

import {
  StyledWrapper
} from './style'

export default memo(function TopIntro(props) {

  /**
   * props and state
   */
  const { currentCategory = {} } = props

  return (
    <StyledWrapper className="top-category">
      <div className="top-cover">
        <img src={formatUrlWithSize(currentCategory.coverImgUrl, 150)} alt={currentCategory.name} />
        <span className="sprite_covor mask"></span>
      </div>
      <div className="top-info">
        <h2 className="top-name">{currentCategory.name}</h2>
        <div className="top-update">
          <i className="sprite_icon2 clock"></i>
          <span className="date">{'最近更新：' + formatDate(currentCategory.updateTime, 'MM月dd日')}</span>
          <span className="frequency">{'（' + currentCategory.updateFrequency + '）'}</span>
        </div>
        <OperationBar />
      </div>
    </StyledWrapper>
  )
})
