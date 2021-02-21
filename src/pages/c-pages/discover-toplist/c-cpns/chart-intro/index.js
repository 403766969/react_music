import React, { memo } from 'react'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import OperationBar from '@/components/operation-bar'

import { StyledWrapper } from './style'

export default memo(function ChartIntro(props) {

  /**
   * props and state
   */
  const { cpnData = {} } = props

  return Object.keys(cpnData).length > 0 && (
    <StyledWrapper className="cpn-chart-intro">
      <div className="chart-cover">
        <img src={formatUrlWithSize(cpnData.coverImgUrl, 150)} alt={cpnData.name} />
        <span className="sprite_covor mask"></span>
      </div>
      <div className="chart-info">
        <h2 className="chart-name">{cpnData.name}</h2>
        <div className="chart-update">
          <i className="sprite_icon2 clock"></i>
          <span className="date">最近更新：{formatDate(cpnData.updateTime, 'MM月dd日')}</span>
          <span className="frequency">（{cpnData.updateFrequency}）</span>
        </div>
        <OperationBar
          songsheetId={cpnData.id}
          favorText={cpnData.favorCount}
          shareText={cpnData.shareCount}
          commentText={cpnData.commentCount} />
      </div>
    </StyledWrapper>
  )
})
