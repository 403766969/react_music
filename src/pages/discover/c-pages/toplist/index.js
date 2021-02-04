import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  action_get_topCategories,
  action_set_topCategories,
  action_set_currentCategory
} from './store/actionCreators'

import TopCategory from './c-cpns/top-category'
import TopIntro from './c-cpns/top-intro'

import {
  StyledWrapper,
  StyledLeft,
  StyledRight
} from './style'

export default memo(function Toplist(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const topCategoryId = parseInt(params.get('id'))

  /**
   * redux hooks
   */
  const {
    r_topCategories,
    r_currentCategory
  } = useSelector(state => ({
    r_topCategories: state.getIn(['toplist', 'topCategories']),
    r_currentCategory: state.getIn(['toplist', 'currentCategory'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_topCategories(topCategoryId))
    return () => {
      dispatch(action_set_topCategories([]))
      dispatch(action_set_currentCategory({}))
    }
  }, [dispatch, topCategoryId])

  return (
    <StyledWrapper className="wrap-v2">
      <StyledLeft>
        <TopCategory title="云音乐特色榜" categories={r_topCategories.slice(0, 4)} currentCategory={r_currentCategory} />
        <TopCategory title="全球媒体榜" categories={r_topCategories.slice(4, r_topCategories.length)} currentCategory={r_currentCategory} />
      </StyledLeft>
      <StyledRight>
        <TopIntro currentCategory={r_currentCategory} />
      </StyledRight>
    </StyledWrapper>
  )
})
