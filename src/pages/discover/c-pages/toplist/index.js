import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  action_get_topCategory,
  action_set_topCategory,
  action_set_currentCategory
} from './store/actionCreators'

import TopCategory from './c-cpns/top-category'

import {
  StyledWrapper,
  StyledLeft,
  StyledRight
} from './style'

export default memo(function Toplist() {

  /**
   * redux hooks
   */
  const {
    r_topCategory,
    r_currentCategory
  } = useSelector(state => ({
    r_topCategory: state.getIn(['toplist', 'topCategory']),
    r_currentCategory: state.getIn(['toplist', 'currentCategory'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_topCategory())
    return () => {
      dispatch(action_set_topCategory([]))
      dispatch(action_set_currentCategory({}))
    }
  }, [dispatch])

  return (
    <StyledWrapper className="wrap-v2">
      <StyledLeft>
        <TopCategory title="云音乐特色榜" categories={r_topCategory.slice(0, 4)} currentCategory={r_currentCategory} />
        <TopCategory title="全球媒体榜" categories={r_topCategory.slice(4, r_topCategory.length)} currentCategory={r_currentCategory} />
      </StyledLeft>
      <StyledRight>

      </StyledRight>
    </StyledWrapper>
  )
})
