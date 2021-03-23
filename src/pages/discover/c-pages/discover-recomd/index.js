import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import TopBanner from './c-cpns/top-banner'
import HotRecomd from './c-cpns/hot-recomd'
import NewAlbum from './c-cpns/new-album'
import RankMulti from './c-cpns/rank-multi'
import UserLogin from './c-cpns/user-login'
import HotArtist from './c-cpns/hot-artist'
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
    r_hotArtistList,
    r_rankMultiListIsLoading
  } = useSelector(state => ({
    r_topBannerList: state.getIn(['discover/recomd', 'topBannerList']),
    r_hotRecomdList: state.getIn(['discover/recomd', 'hotRecomdList']),
    r_newAlbumList: state.getIn(['discover/recomd', 'newAlbumList']),
    r_rankMultiList: state.getIn(['discover/recomd', 'rankMultiList']),
    r_hotArtistList: state.getIn(['discover/recomd', 'hotArtistList']),
    r_rankMultiListIsLoading: state.getIn(['discover/recomd', 'rankMultiListIsLoading'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(actions.get_topBannerList())
    dispatch(actions.get_hotRecomdList(8))
    dispatch(actions.get_newAlbumList())
    dispatch(actions.get_rankMultiList(3))
    dispatch(actions.get_hotArtistList(0, 5))
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.clear_state())
    }
  }, [dispatch])

  return (
    <StyledWrapper className="page-discover-recomd">
      <TopBanner bannerList={r_topBannerList} />
      <div className="content wrap-v3">
        <div className="left">
          <HotRecomd recomdList={r_hotRecomdList} />
          <NewAlbum albumList={r_newAlbumList} />
          <RankMulti rankList={r_rankMultiList} isLoading={r_rankMultiListIsLoading} />
        </div>
        <div className="right">
          <UserLogin />
          <HotArtist artistList={r_hotArtistList} />
          <HotAnchor />
        </div>
      </div>
    </StyledWrapper>
  )
})
