import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import CommentArea from '@/components/comment-area'
import SongArea from '@/components/song-area'

import ChartList from './c-cpns/chart-list'
import ChartDetail from './c-cpns/chart-detail'

import { StyledWrapper } from './style'

export default memo(function DiscoverToplist(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const paramsId = params.get('id') && parseInt(params.get('id'))

  /**
   * props and state
   */
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux hooks
   */
  const {
    r_chartList,
    r_chartDetail,
    r_songList,
    r_hotCommentList,
    r_newCommentList,
    r_newCommentCount
  } = useSelector(state => ({
    r_chartList: state.getIn(['discover/toplist', 'chartList']),
    r_chartDetail: state.getIn(['discover/toplist', 'chartDetail']),
    r_songList: state.getIn(['discover/toplist', 'songList']),
    r_hotCommentList: state.getIn(['discover/toplist', 'hotCommentList']),
    r_newCommentList: state.getIn(['discover/toplist', 'newCommentList']),
    r_newCommentCount: state.getIn(['discover/toplist', 'newCommentCount'])
  }), shallowEqual)

  const dispatch = useDispatch()

  const firstChart = r_chartList && r_chartList[0]
  const currentChartId = paramsId || (firstChart && firstChart.id)

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(actions.get_chartList())
  }, [dispatch])

  useEffect(() => {
    if (currentChartId) {
      dispatch(actions.get_chartDetail(currentChartId))
      dispatch(actions.get_hotCommentList(currentChartId, 0, 15))
      dispatch(actions.get_newCommentList(currentChartId, 0, 20))
    }
    setCurrentPage(1)
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.merge_state({
        chartDetail: null,
        songList: [],
        hotCommentList: [],
        newCommentList: [],
        newCommentCount: 0
      }))
    }
  }, [dispatch, currentChartId])

  const commentRef = useRef()

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    dispatch(actions.get_newCommentList(currentChartId, (page - 1) * 20, 20))
    setCurrentPage(page)
    window.scrollTo(0, commentRef.current.offsetTop + 100)
  }, [dispatch, currentChartId])

  return (
    <StyledWrapper className="page-discover-toplist wrap-v3">
      <div className="left">
        <ChartList title="云音乐特色榜" chartList={r_chartList.slice(0, 4)} currentChartId={currentChartId} />
        <ChartList title="全球媒体榜" chartList={r_chartList.slice(4, r_chartList.length)} currentChartId={currentChartId} />
      </div>
      <div className="right">
        <ChartDetail chartDetail={r_chartDetail} chartList={r_chartList} currentChartId={currentChartId} songList={r_songList} />
        <SongArea
          songCount={r_songList && r_songList.length}
          playCount={r_chartDetail && r_chartDetail.playCount}
          link={r_chartDetail && `https://music.163.com/#/outchain/0/${r_chartDetail.id}`}
          showCoverCount={3}
          order name duration artist={{ width: '170px' }}
          songList={r_songList} />
        <div className="toplist-comment" ref={commentRef}>
          <CommentArea
            hotCommentList={r_hotCommentList}
            newCommentList={r_newCommentList}
            newCommentCount={r_newCommentCount}
            currentPage={currentPage}
            onPageChange={handlePageChange} />
        </div>
      </div>
    </StyledWrapper>
  )
})
