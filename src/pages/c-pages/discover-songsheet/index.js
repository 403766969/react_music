import React, { memo, useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import Pagination from '@/components/pagination-bar'

import CatList from './c-cpns/cat-list'
import SongsheetList from './c-cpns/songsheet-list'

import { StyledWrapper } from './style'

export default memo(function Songsheet(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const sub = params.get('sub')

  /**
   * props and state
   */
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux hooks
   */
  const {
    r_catList,
    r_currentSub,
    r_songsheetData
  } = useSelector(state => ({
    r_catList: state.getIn(['discover/songsheet', 'catList']),
    r_currentSub: state.getIn(['discover/songsheet', 'currentSub']),
    r_songsheetData: state.getIn(['discover/songsheet', 'songsheetData'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(actions.get_catList(sub))
    window.scrollTo(0, 0)
  }, [dispatch, sub])

  /**
   * other logic
   */
  const handleSubChange = useCallback(sub => {
    dispatch(actions.set_currentSub(sub))
    dispatch(actions.get_songsheetData(0, 35, 'hot'))
    setCurrentPage(1)
  }, [dispatch])

  const handlePageChange = useCallback(page => {
    dispatch(actions.get_songsheetData((page - 1) * 35, 35, 'hot'))
    setCurrentPage(page)
    window.scrollTo(0, 140)
  }, [dispatch])

  return (
    <StyledWrapper className="page-discover-songsheet wrap-v2">
      <div className="header">
        <CatList listData={r_catList} currentSub={r_currentSub} onChange={handleSubChange} />
        <div className="hot sprite_button2">
          <span>热门</span>
        </div>
      </div>
      <div className="content">
        <SongsheetList listData={r_songsheetData.playlists} />
      </div>
      <div className="footer">
        <Pagination current={currentPage} total={r_songsheetData.total} pageSize={35} itemCount={9} onChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
