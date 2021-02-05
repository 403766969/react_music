import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  action_get_carouselImages,
  action_get_hotRecomdList,
  action_get_newAlbumList,
  action_get_rankMultiList,
  action_get_settleSingerList
} from './store/actionCreators'

import TopBanner from './c-cpns/top-banner'
import HotRecomd from './c-cpns/hot-recomd'
import NewAlbum from './c-cpns/new-album'
import RankMulti from './c-cpns/rank-multi'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'

import {
  StyledWrapper,
  StyledContent,
  StyledLeft,
  StyledRight
} from './style'

export default memo(function Recomd() {

  /**
 * redux hooks
 */
  const {
    carouselImages: r_carouselImages,
    hotRecomdList: r_hotRecomdList,
    newAlbumList: r_newAlbumList,
    rankMultiList: r_rankMultiList,
    settleSingerList: r_settleSingerList
  } = useSelector(state => ({
    carouselImages: state.getIn(['recomd', 'carouselImages']),
    hotRecomdList: state.getIn(['recomd', 'hotRecomdList']),
    newAlbumList: state.getIn(['recomd', 'newAlbumList']),
    rankMultiList: state.getIn(['recomd', 'rankMultiList']),
    settleSingerList: state.getIn(['recomd', 'settleSingerList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_carouselImages())
    dispatch(action_get_hotRecomdList(8))
    dispatch(action_get_newAlbumList(10, 0))
    dispatch(action_get_rankMultiList())
    dispatch(action_get_settleSingerList(5001, 5))
  }, [dispatch])

  return (
    <StyledWrapper>
      <TopBanner carouselImages={r_carouselImages} />
      <StyledContent className="wrap-v2">
        <StyledLeft>
          <HotRecomd hotRecomdList={r_hotRecomdList} />
          <NewAlbum newAlbumList={r_newAlbumList} />
          <RankMulti rankMultiList={r_rankMultiList} />
        </StyledLeft>
        <StyledRight>
          <UserLogin />
          <SettleSinger settleSingerList={r_settleSingerList} />
          <HotAnchor />
        </StyledRight>
      </StyledContent>
    </StyledWrapper>
  )
})
