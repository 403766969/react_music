import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import TopBanner from './c-cpns/top-banner'
import HotRecomd from './c-cpns/hot-recomd'
import NewAlbum from './c-cpns/new-album'
import RankMulti from './c-cpns/rank-multi'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'

import { StyledWrapper } from './style'

export default memo(function DiscoverRecomd() {

  /**
 * redux hooks
 */
  const {
    r_topBannerList,
    r_hotRecomdList,
    r_newAlbumList,
    r_rankMultiList,
    r_settleSingerList
  } = useSelector(state => ({
    r_topBannerList: state.getIn(['discover/recomd', 'topBannerList']),
    r_hotRecomdList: state.getIn(['discover/recomd', 'hotRecomdList']),
    r_newAlbumList: state.getIn(['discover/recomd', 'newAlbumList']),
    r_rankMultiList: state.getIn(['discover/recomd', 'rankMultiList']),
    r_settleSingerList: state.getIn(['discover/recomd', 'settleSingerList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(actions.get_topBannerList())
    dispatch(actions.get_hotRecomdList(8))
    dispatch(actions.get_newAlbumList(10, 0))
    dispatch(actions.get_rankMultiList(3))
    dispatch(actions.get_settleSingerList(5001, 5))
    window.scrollTo(0, 0)
  }, [dispatch])

  return (
    <StyledWrapper className="page-discover-recomd">
      <TopBanner cpnData={r_topBannerList} />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecomd cpnData={r_hotRecomdList} />
          <NewAlbum cpnData={r_newAlbumList} />
          <RankMulti cpnData={r_rankMultiList} />
        </div>
        <div className="right">
          <UserLogin />
          <SettleSinger cpnData={r_settleSingerList} />
          <HotAnchor />
        </div>
      </div>
    </StyledWrapper>
  )
})
