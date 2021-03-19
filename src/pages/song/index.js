import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

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
  const songId = params.get('id') && parseInt(params.get('id'))

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
    r_hotCommentList,
    r_newCommentList,
    r_newCommentCount,
    r_simiSongsheetList,
    r_simiSongList
  } = useSelector(state => ({
    r_songDetail: state.getIn(['song', 'songDetail']),
    r_songLyric: state.getIn(['song', 'songLyric']),
    r_hotCommentList: state.getIn(['song', 'hotCommentList']),
    r_newCommentList: state.getIn(['song', 'newCommentList']),
    r_newCommentCount: state.getIn(['song', 'newCommentCount']),
    r_simiSongsheetList: state.getIn(['song', 'simiSongsheetList']),
    r_simiSongList: state.getIn(['song', 'simiSongList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /** other hooks */
  useEffect(() => {
    if (songId) {
      dispatch(actions.get_songDetail(songId))
      dispatch(actions.get_songLyric(songId))
      dispatch(actions.get_hotCommentList(songId, 0, 15))
      dispatch(actions.get_newCommentList(songId, 0, 20))
      dispatch(actions.get_simiSongsheetList(songId))
      dispatch(actions.get_simiSongList(songId))
    }
    setCurrentPage(1)
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.clear_state())
    }
  }, [dispatch, songId])

  const commentRef = useRef()

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    dispatch(actions.get_newCommentList(songId, (page - 1) * 20, 20))
    setCurrentPage(page)
    window.scrollTo(0, commentRef.current.offsetTop + 100)
  }, [dispatch, songId])

  let sourceLink = songId && `/song?id=${songId}`

  return (
    <StyleWrapper className="page-song wrap-v3">
      <div className="left">
        <SongDetail songDetail={r_songDetail} songLyric={r_songLyric} commentCount={r_newCommentCount} />
        <div className="song-comment" ref={commentRef}>
          <CommentArea
            hotCommentList={r_hotCommentList}
            newCommentList={r_newCommentList}
            newCommentCount={r_newCommentCount}
            currentPage={currentPage}
            onPageChange={handlePageChange} />
        </div>
      </div>
      <div className="right">
        <SimiSongsheet title="包含这首歌的歌单" songsheetList={r_simiSongsheetList} />
        <SimiSong title="相似歌曲" songList={r_simiSongList} sourceLink={sourceLink} />
        <DownLoad />
      </div>
    </StyleWrapper>
  )
})
