import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import ChannelBar from '@/components/channel-bar'
import CommentArea from '@/components/comment-area'
import SimiSongsheet from '@/components/simi-songsheet'
import SimiSong from '@/components/simi-song'
import DownLoad from '@/components/down-load'

import SongDetail from './c-cpns/song-detail'

import { StyleWrapper } from './style'

export default memo(function Song(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const songId = params.get('id')

  /**
   * props and state
   */
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux hooks
   */
  const {
    r_songDetail,
    r_songLyric,
    r_hotComment,
    r_newComment,
    r_simiSongsheetList,
    r_simiSongList
  } = useSelector(state => ({
    r_songDetail: state.getIn(['song', 'songDetail']),
    r_songLyric: state.getIn(['song', 'songLyric']),
    r_hotComment: state.getIn(['song', 'hotComment']),
    r_newComment: state.getIn(['song', 'newComment']),
    r_simiSongsheetList: state.getIn(['song', 'simiSongsheetList']),
    r_simiSongList: state.getIn(['song', 'simiSongList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /** other hooks */
  useEffect(() => {
    if (songId) {
      dispatch(actions.get_songDetail(songId))
      dispatch(actions.get_songLyric(songId))
      dispatch(actions.get_hotComment(songId, 0, 15))
      dispatch(actions.get_newComment(songId, 0, 20))
      dispatch(actions.get_simiSongsheetList(songId))
      dispatch(actions.get_simiSongList(songId))
    }
    setCurrentPage(1)
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.set_songDetail({}))
      dispatch(actions.set_songLyric([]))
      dispatch(actions.set_hotComment({}))
      dispatch(actions.set_newComment({}))
      dispatch(actions.set_simiSongsheetList([]))
      dispatch(actions.set_simiSongList([]))
    }
  }, [dispatch, songId])

  const commentRef = useRef()

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    dispatch(actions.get_newComment(songId, (page - 1) * 20, 20))
    setCurrentPage(page)
    window.scrollTo(0, commentRef.current.offsetTop + 100)
  }, [dispatch, songId])

  const SongDetailData = {
    songDetail: r_songDetail,
    songLyric: r_songLyric,
    commentTotal: r_newComment.total
  }

  return (
    <StyleWrapper className="page-song wrap-min-width">
      <ChannelBar />
      <div className="content wrap-v2">
        <div className="left">
          <SongDetail cpnData={SongDetailData} />
          <div className="song-comment" ref={commentRef}>
            <CommentArea hotComment={r_hotComment} newComment={r_newComment} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
        <div className="right">
          <SimiSongsheet title="包含这首歌的歌单" listData={r_simiSongsheetList} />
          <SimiSong title="相似歌曲" listData={r_simiSongList} />
          <DownLoad />
        </div>
      </div>
    </StyleWrapper>
  )
})
