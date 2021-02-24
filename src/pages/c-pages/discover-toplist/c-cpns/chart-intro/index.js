import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import * as playerActions from '@/pages/player/store/acitonCreators'

import OperationBar from '@/components/operation-bar'

import { StyledWrapper } from './style'

export default memo(function ChartIntro(props) {

  /**
   * props and state
   */
  const { cpnData = {} } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = useCallback(() => {
    dispatch(playerActions.add_multipleSong_with_trackIds(cpnData.trackIds, true))
  }, [dispatch, cpnData])

  const handleAddClick = useCallback(() => {
    dispatch(playerActions.add_multipleSong_with_trackIds(cpnData.trackIds, false))
  }, [dispatch, cpnData])

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
          favorText={cpnData.favorCount}
          shareText={cpnData.shareCount}
          commentText={cpnData.commentCount}
          onPlayClick={handlePlayClick}
          onAddClick={handleAddClick} />
      </div>
    </StyledWrapper>
  )
})
