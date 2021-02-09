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
  const { currentTop = {} } = props

  return (
    <StyledWrapper className="cpn-top-intro">
      <div className="top-cover">
        <img src={formatUrlWithSize(currentTop.coverImgUrl, 150)} alt={currentTop.name} />
        <span className="sprite_covor mask"></span>
      </div>
      <div className="top-info">
        <h2 className="top-name">{currentTop.name}</h2>
        <div className="top-update">
          <i className="sprite_icon2 clock"></i>
          <span className="date">最近更新：{formatDate(currentTop.updateTime, 'MM月dd日')}</span>
          <span className="frequency">（{currentTop.updateFrequency}）</span>
        </div>
        <OperationBar songsheetId={currentTop.id} />
      </div>
    </StyledWrapper>
  )
})
