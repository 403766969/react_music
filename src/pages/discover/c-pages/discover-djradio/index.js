import React, { memo, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as actions from './store/actionCreators'

import Pagination from '@/components/pagination-bar'

import CateList from './c-cpns/cate-list'
import RecomdRadio from './c-cpns/recomd-radio'
import HotRadio from './c-cpns/hot-radio'

import { StyledWrapper } from './style'

export default memo(function DiscoverDjradio(props) {

  /**
   * props and state
   */
  const params = new URLSearchParams(props.location.search)
  const category = (params.get('category') && parseInt(params.get('category'))) || 3
  const page = (params.get('page') && parseInt(params.get('page'))) || 1

  /**
   * redux hooks
   */
  const {
    r_cateList,
    r_recomdRadioList,
    r_hotRadioList,
    r_hotRadioCount
  } = useSelector(state => ({
    r_cateList: state.getIn(['discover/djradio', 'cateList']),
    r_recomdRadioList: state.getIn(['discover/djradio', 'recomdRadioList']),
    r_hotRadioList: state.getIn(['discover/djradio', 'hotRadioList']),
    r_hotRadioCount: state.getIn(['discover/djradio', 'hotRadioCount'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    if (category) {
      dispatch(actions.get_recomdRadioList(category))
      dispatch(actions.get_hotRadioList(category, (page - 1) * 20, 20))
    }
  }, [dispatch, category, page])

  useEffect(() => {
    dispatch(actions.get_cateList())
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
    history.push(`/discover/djradio?category=${category}&page=${page}`)
    window.scrollTo(0, posRef.current.offsetTop)
  }, [history, category])

  return (
    <StyledWrapper className="page-discover-djradio wrap-v3">
      <CateList cateList={r_cateList} category={category} />
      <RecomdRadio recomdRadioList={r_recomdRadioList} />
      <div ref={posRef}>
        <HotRadio hotRadioList={r_hotRadioList} hotRadioCount={r_hotRadioCount} />
      </div>
      <div className="footer">
        <Pagination currentPage={page} total={r_hotRadioCount} pageSize={20} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
