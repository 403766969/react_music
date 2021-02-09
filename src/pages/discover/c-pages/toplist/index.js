import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  action_get_topCategories,
  action_set_topCategories,
  action_set_currentTop,
  action_set_currentSongList
} from './store/actionCreators'

import TopCategory from './c-cpns/top-category'
import TopIntro from './c-cpns/top-intro'
import SongList from './c-cpns/song-list'

import { StyledWrapper } from './style'

export default memo(function Toplist(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const topId = parseInt(params.get('id'))

  /**
   * redux hooks
   */
  const {
    r_topCategories,
    r_currentTop,
    r_currentSongList
  } = useSelector(state => ({
    r_topCategories: state.getIn(['toplist', 'topCategories']),
    r_currentTop: state.getIn(['toplist', 'currentTop']),
    r_currentSongList: state.getIn(['toplist', 'currentSongList']),
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_topCategories(topId))
    return () => {
      dispatch(action_set_topCategories([]))
      dispatch(action_set_currentTop({}))
      dispatch(action_set_currentSongList([]))
    }
  }, [dispatch, topId])

  return (
    <StyledWrapper className="page-discover-toplist wrap-v2">
      <div className="left">
        <TopCategory title="云音乐特色榜" topCategories={r_topCategories.slice(0, 4)} currentTop={r_currentTop} />
        <TopCategory title="全球媒体榜" topCategories={r_topCategories.slice(4, r_topCategories.length)} currentTop={r_currentTop} />
      </div>
      <div className="right">
        <TopIntro currentTop={r_currentTop} />
        <SongList currentTop={r_currentTop} currentSongList={r_currentSongList} />
      </div>
    </StyledWrapper>
  )
})
