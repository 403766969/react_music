import React, { memo, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as actions from './store/actionCreators'

import Pagination from '@/components/pagination-bar'

import CatSub from './c-cpns/cat-sub'
import SongsheetList from './c-cpns/songsheet-list'

import { StyledWrapper } from './style'

export default memo(function Songsheet(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const currentSub = params.get('sub') || '全部'
  const currentOrder = params.get('order') || 'hot'
  const currentPage = (params.get('page') && parseInt(params.get('page'))) || 1

  /**
   * redux hooks
   */
  const {
    r_catSubList,
    r_songsheetList,
    r_songsheetCount
  } = useSelector(state => ({
    r_catSubList: state.getIn(['discover/songsheet', 'catSubList']),
    r_songsheetList: state.getIn(['discover/songsheet', 'songsheetList']),
    r_songsheetCount: state.getIn(['discover/songsheet', 'songsheetCount'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const history = useHistory()

  useEffect(() => {
    dispatch(actions.get_catSubList())
  }, [dispatch])

  useEffect(() => {
    dispatch(actions.get_songsheetList(currentSub, currentOrder, (currentPage - 1) * 35, 35))
    return () => {
      dispatch(actions.merge_state({
        songsheetList: [],
        songsheetCount: 0
      }))
    }
  }, [dispatch, currentSub, currentOrder, currentPage])

  /**
   * other logic
   */
  const handleSubClick = useCallback(sub => {
    history.push(`/discover/songsheet?sub=${sub}&order=${currentOrder}&page=${1}`)
  }, [history, currentOrder])

  const handlePageChange = useCallback(page => {
    history.push(`/discover/songsheet?sub=${currentSub}&order=${currentOrder}&page=${page}`)
    window.scrollTo(0, 140)
  }, [history, currentSub, currentOrder])

  return (
    <StyledWrapper className="page-discover-songsheet wrap-v2">
      <div className="header">
        <CatSub catSubList={r_catSubList} currentSub={currentSub} onSubClick={handleSubClick} />
        <div className="hot sprite_button2">
          <span>热门</span>
        </div>
      </div>
      <div className="content">
        <SongsheetList songsheetList={r_songsheetList} />
      </div>
      <div className="footer">
        <Pagination currentPage={currentPage} total={r_songsheetCount} pageSize={35} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
