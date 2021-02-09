import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  action_get_songInfo,
  action_set_songInfo,
  action_get_songLyric,
  action_set_songLyric,
  action_get_simiSongsheet,
  action_set_simiSongsheet,
  action_get_simiSong,
  action_set_simiSong
} from './store/actionCreators'

import SongInfo from './c-cpns/song-info'
import SimiSongsheet from './c-cpns/simi-songsheet'
import SimiSong from './c-cpns/simi-song'

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
    songInfo: r_songInfo,
    songLyric: r_songLyric,
    simiSongsheet: r_simiSongsheet,
    simiSong: r_simiSong
  } = useSelector(state => ({
    songInfo: state.getIn(['song', 'songInfo']),
    songLyric: state.getIn(['song', 'songLyric']),
    simiSongsheet: state.getIn(['song', 'simiSongsheet']),
    simiSong: state.getIn(['song', 'simiSong'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /** other hooks */
  useEffect(() => {
    dispatch(action_get_songInfo(songId))
    dispatch(action_get_songLyric(songId))
    dispatch(action_get_simiSongsheet(songId))
    dispatch(action_get_simiSong(songId))
    return () => {
      dispatch(action_set_songInfo({}))
      dispatch(action_set_songLyric([]))
      dispatch(action_set_simiSongsheet([]))
      dispatch(action_set_simiSong([]))
    }
  }, [dispatch, songId])

  return (
    <StyleWrapper className="page-song">
      <div className="content wrap-v2">
        <div className="left">
          <SongInfo songData={r_songInfo} songLyric={r_songLyric} />
        </div>
        <div className="right">
          <SimiSongsheet simiSongsheet={r_simiSongsheet} />
          <SimiSong simiSong={r_simiSong} />
        </div>
      </div>
    </StyleWrapper>
  )
})
