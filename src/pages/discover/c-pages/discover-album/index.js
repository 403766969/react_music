import React, { memo, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as actions from './store/actionCreators'

import Pagination from '@/components/pagination-bar'

import HotAlbum from './c-cpns/hot-album'
import AllAlbum from './c-cpns/all-album'

import { StyledWrapper } from './style'

export default memo(function DiscoverAlbum(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const area = params.get('area') || 'ALL'
  const page = (params.get('page') && parseInt(params.get('page'))) || 1

  /**
   * redux hooks
   */
  const {
    r_hotAlbumList,
    r_allAlbumList,
    r_allAlbumCount,
    r_allAlbumListIsLoading
  } = useSelector(state => ({
    r_hotAlbumList: state.getIn(['discover/album', 'hotAlbumList']),
    r_allAlbumList: state.getIn(['discover/album', 'allAlbumList']),
    r_allAlbumCount: state.getIn(['discover/album', 'allAlbumCount']),
    r_allAlbumListIsLoading: state.getIn(['discover/album', 'allAlbumListIsLoading'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(actions.set_allAlbumCount(0))
  }, [dispatch, area])

  useEffect(() => {
    dispatch(actions.get_allAlbumList(area, (page - 1) * 35, 35))
  }, [dispatch, area, page])

  useEffect(() => {
    dispatch(actions.get_hotAlbumList())
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.clear_state())
    }
  }, [dispatch])

  const history = useHistory()

  const posRef = useRef()

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    history.push(`/discover/album?area=${area}&page=${page}`)
    window.scrollTo(0, posRef.current.offsetTop)
  }, [history, area])

  return (
    <StyledWrapper className="page-discover-album wrap-v3">
      <HotAlbum hotAlbumList={r_hotAlbumList} />
      <div ref={posRef}>
        <AllAlbum allAlbumList={r_allAlbumList} allAlbumCount={r_allAlbumCount} isLoading={r_allAlbumListIsLoading} />
      </div>
      <div className="footer">
        <Pagination currentPage={page} total={r_allAlbumCount} pageSize={35} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
