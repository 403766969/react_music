import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import * as playerActions from '@/pages/player/store/acitonCreators'

import OperationBar from '@/components/operation-bar'

import { StyledWrapper } from './style'

export default memo(function ChartDetail(props) {

  /**
   * props and state
   */
  const { chartDetail, chartList, currentChartId, songList } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = useCallback(() => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, true))
    } else if (chartDetail) {
      dispatch(playerActions.add_multipleSong_with_trackIds(chartDetail.trackIds, true))
    }
  }, [dispatch, chartDetail, songList])

  const handleAddClick = useCallback(() => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, false))
    } else if (chartDetail) {
      dispatch(playerActions.add_multipleSong_with_trackIds(chartDetail.trackIds, false))
    }
  }, [dispatch, chartDetail, songList])

  /**
   * render logic
   */
  const currentChart = chartList && chartList.find(item => item.id === currentChartId)
  const updateFrequency = currentChart ? `（${currentChart.updateFrequency}）` : ''

  return chartDetail
    ? (
      <StyledWrapper className="cpn-chart-detail">
        <div className="chart-cover">
          <img src={formatUrlWithSize(chartDetail.coverImgUrl, 150)} alt={chartDetail.name} />
          <span className="sprite_covor mask"></span>
        </div>
        <div className="chart-info">
          <h2 className="chart-name">{chartDetail.name}</h2>
          <div className="chart-update">
            <i className="sprite_icon2 clock"></i>
            <span className="date">最近更新：{formatDate(chartDetail.updateTime, 'MM月dd日')}</span>
            <span className="frequency">{updateFrequency}</span>
          </div>
          <OperationBar
            favorText={chartDetail.favorCount}
            shareText={chartDetail.shareCount}
            commentText={chartDetail.commentCount}
            onPlayClick={handlePlayClick}
            onAddClick={handleAddClick} />
        </div>
      </StyledWrapper>
    )
    : null
})
