import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import ChartList from './c-cpns/chart-list'
import ChartIntro from './c-cpns/chart-intro'
import SongList from './c-cpns/song-list'

import { StyledWrapper } from './style'

export default memo(function DiscoverToplist(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const chartId = params.get('id') && parseInt(params.get('id'))

  /**
   * redux hooks
   */
  const {
    r_chartList,
    r_currentChart,
    r_currentChartDetail,
    r_currentChartSongList
  } = useSelector(state => ({
    r_chartList: state.getIn(['discover/toplist', 'chartList']),
    r_currentChart: state.getIn(['discover/toplist', 'currentChart']),
    r_currentChartDetail: state.getIn(['discover/toplist', 'currentChartDetail']),
    r_currentChartSongList: state.getIn(['discover/toplist', 'currentChartSongList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(actions.get_chartList(chartId))
    window.scrollTo(0, 0)
  }, [dispatch, chartId])

  /**
   * other logic
   */
  const songListData = {
    playCount: r_currentChartDetail.playCount,
    trackCount: r_currentChartDetail.trackCount,
    trackList: r_currentChartSongList
  }

  return (
    <StyledWrapper className="page-discover-toplist wrap-v2">
      <div className="left">
        <ChartList title="云音乐特色榜" listData={r_chartList.slice(0, 4)} currentChart={r_currentChart} />
        <ChartList title="全球媒体榜" listData={r_chartList.slice(4, r_chartList.length)} currentChart={r_currentChart} />
      </div>
      <div className="right">
        <ChartIntro chartDetail={r_currentChartDetail} />
        <SongList listData={songListData} />
      </div>
    </StyledWrapper>
  )
})
