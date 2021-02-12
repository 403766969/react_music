import React, { memo } from 'react'

import {
  formatUrlWithSize,
  formatDate
} from '@/utils/formatter'

import OperationBar from '@/components/operation-bar'

import {
  StyledWrapper
} from './style'

export default memo(function ChartIntro(props) {

  /**
   * props and state
   */
  const { chartDetail = {} } = props

  return Object.keys(chartDetail).length > 0 && (
    <StyledWrapper className="cpn-chart-intro">
      <div className="chart-cover">
        <img src={formatUrlWithSize(chartDetail.coverImgUrl, 150)} alt={chartDetail.name} />
        <span className="sprite_covor mask"></span>
      </div>
      <div className="chart-info">
        <h2 className="chart-name">{chartDetail.name}</h2>
        <div className="chart-update">
          <i className="sprite_icon2 clock"></i>
          <span className="date">最近更新：{formatDate(chartDetail.updateTime, 'MM月dd日')}</span>
          <span className="frequency">（{chartDetail.updateFrequency}）</span>
        </div>
        <OperationBar
          songsheetId={chartDetail.id}
          favorText={chartDetail.favorCount}
          shareText={chartDetail.shareCount}
          commentText={chartDetail.commentCount} />
      </div>
    </StyledWrapper>
  )
})
