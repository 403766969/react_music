import React, { memo, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  action_get_catList,
  action_set_catList,
} from './store/actionCreators'

import Pagination from '@/components/pagination-bar'

import CatlistPanel from './c-cpns/catlist-panel'

import {
  StyledWrapper
} from './style'

export default memo(function Songsheet() {

  /**
   * redux hooks
   */
  const {
    r_catList
  } = useSelector(state => ({
    r_catList: state.getIn(['songsheet', 'catList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_catList())
    return () => {
      dispatch(action_set_catList([]))
    }
  }, [dispatch])

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    console.log(page)
  }, [])

  return (
    <StyledWrapper className="wrap-v2">
      <CatlistPanel catList={r_catList} />
      <Pagination total={1298} pageSize={35} itemCount={9} onChange={handlePageChange} />
    </StyledWrapper>
  )
})
