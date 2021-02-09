import React, { memo, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  action_get_catList,
  action_set_catList,
  action_set_currentCat,
  action_get_songsheetData,
  action_set_songsheetData
} from './store/actionCreators'

import Pagination from '@/components/pagination-bar'

import CatlistPanel from './c-cpns/catlist-panel'
import SongsheetList from './c-cpns/songsheet-list'

import {
  StyledWrapper
} from './style'

export default memo(function Songsheet(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const cat = params.get('cat') || '全部'

  /**
   * redux hooks
   */
  const {
    r_catList,
    r_songsheetData
  } = useSelector(state => ({
    r_catList: state.getIn(['songsheet', 'catList']),
    r_songsheetData: state.getIn(['songsheet', 'songsheetData'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_catList())
    dispatch(action_set_currentCat(cat))
    dispatch(action_get_songsheetData(0, 35))
    return () => {
      dispatch(action_set_catList([]))
      dispatch(action_set_songsheetData({}))
    }
  }, [dispatch, cat])

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    dispatch(action_get_songsheetData((page - 1) * 35, 35))
    window.scrollTo(0, 0)
  }, [dispatch])

  return (
    <StyledWrapper className="page-discover-songsheet wrap-v2">
      <div className="header">
        <CatlistPanel catList={r_catList} />
        <div className="hot sprite_button2">
          <span>热门</span>
        </div>
      </div>
      <div className="content">
        <SongsheetList listData={r_songsheetData.playlists} />
      </div>
      <div className="footer">
        <Pagination total={r_songsheetData.total} pageSize={35} itemCount={9} onChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
