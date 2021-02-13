import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import ChannelBar from '@/components/channel-bar'
import SimiSongsheet from '@/components/simi-songsheet'
import SimiSong from '@/components/simi-song'

import SongDetail from './c-cpns/song-detail'

import { StyleWrapper } from './style'

export default memo(function Song(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const songId = params.get('id')

  /**
   * redux hooks
   */
  const {
    r_songDetail,
    r_songLyric,
    r_simiSongsheetList,
    r_simiSongList
  } = useSelector(state => ({
    r_songDetail: state.getIn(['song', 'songDetail']),
    r_songLyric: state.getIn(['song', 'songLyric']),
    r_simiSongsheetList: state.getIn(['song', 'simiSongsheetList']),
    r_simiSongList: state.getIn(['song', 'simiSongList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /** other hooks */
  useEffect(() => {
    if (songId) {
      dispatch(actions.get_songDetail(songId))
      dispatch(actions.get_songLyric(songId))
      dispatch(actions.get_simiSongsheetList(songId))
      dispatch(actions.get_simiSongList(songId))
    }
    return () => {
      dispatch(actions.set_songDetail({}))
      dispatch(actions.set_songLyric([]))
      dispatch(actions.set_simiSongsheetList([]))
      dispatch(actions.set_simiSongList([]))
    }
  }, [dispatch, songId])

  return (
    <StyleWrapper className="page-song wrap-min-width">
      <ChannelBar />
      <div className="content wrap-v2">
        <div className="left">
          <SongDetail songData={r_songDetail} songLyric={r_songLyric} />
        </div>
        <div className="right">
          <SimiSongsheet title="包含这首歌的歌单" listData={r_simiSongsheetList} />
          <SimiSong title="相似歌曲" listData={r_simiSongList} />
        </div>
      </div>
    </StyleWrapper>
  )
})
