import React, { memo, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import ChannelBar from '@/components/channel-bar'
import TabsArea from '@/components/tabs-area'
import DownLoad from '@/components/down-load'

import BaseInfo from './c-cpns/base-info'
import DescInfo from './c-cpns/desc-info'
import HotSong from './c-cpns/hot-song'
import AllAlbum from './c-cpns/all-album'
import RelatedMv from './c-cpns/related-mv'

import { StyledWrapper } from './style'

export default memo(function Artist(props) {

  /**
   * props and state
   */
  const params = new URLSearchParams(props.location.search)
  const artistId = params.get('id') && parseInt(params.get('id'))
  const tabKey = params.get('tabKey') || 'song'

  /**
   * redux hooks
   */
  const {
    r_baseInfo,
    r_descInfo,
    r_songList,
    r_albumList,
    r_albumCount,
    r_mvList,
    r_mvCount
  } = useSelector(state => ({
    r_baseInfo: state.getIn(['artist', 'baseInfo']),
    r_descInfo: state.getIn(['artist', 'descInfo']),
    r_songList: state.getIn(['artist', 'songList']),
    r_albumList: state.getIn(['artist', 'albumList']),
    r_albumCount: state.getIn(['artist', 'albumCount']),
    r_mvList: state.getIn(['artist', 'mvList']),
    r_mvCount: state.getIn(['artist', 'mvCount'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    if (artistId) {
      dispatch(actions.get_artistDetail(artistId))
      dispatch(actions.get_descInfo(artistId))
      dispatch(actions.get_albumList(artistId, 0, 12))
      dispatch(actions.get_mvList(artistId, 0, 12))
    }
    return () => {
      dispatch(actions.merge_state({
        baseInfo: null,
        descInfo: null,
        songList: [],
        songCount: 0,
        albumList: [],
        albumCount: 0,
        mvList: [],
        mvCount: 0
      }))
    }
  }, [dispatch, artistId])

  /**
   * other logic
   */
  const handleTabClick = useCallback(key => {
    if (artistId) {
      props.history.push(`/artist?id=${artistId}&tabKey=${key}`)
    }
  }, [props.history, artistId])

  return (
    <StyledWrapper className="page-artist">
      <ChannelBar />
      <div className="content wrap-v3">
        <div className="left">
          <BaseInfo baseInfo={r_baseInfo} />
          <TabsArea activeKey={tabKey} onTabClick={handleTabClick}>
            <div tab="热门歌曲" key="song">
              <HotSong songList={r_songList} />
            </div>
            <div tab="所有专辑" key="album">
              <AllAlbum artistId={artistId} albumList={r_albumList} albumCount={r_albumCount} />
            </div>
            <div tab="相关MV" key="mv">
              <RelatedMv artistId={artistId} mvList={r_mvList} mvCount={r_mvCount} />
            </div>
            <div tab="艺人介绍" key="desc">
              <DescInfo descInfo={r_descInfo} />
            </div>
          </TabsArea>
        </div>
        <div className="right">
          <DownLoad />
        </div>
      </div>
    </StyledWrapper>
  )
})