import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import ChannelBar from '@/components/channel-bar'
import SongArea from '@/components/song-area'
import CommentArea from '@/components/comment-area'
import SimiUser from '@/components/simi-user'
import SimiSongsheet from '@/components/simi-songsheet'
import DownLoad from '@/components/down-load'

import SongsheetDetail from './c-cpns/songsheet-detail'

import { StyledWrapper } from './style'

export default memo(function Songsheet(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const songsheetId = params.get('id')

  /**
   * props and state
   */
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux hooks
   */
  const {
    r_songsheetDetail,
    r_songList,
    r_hotComment,
    r_newComment,
    r_relatedSongsheet
  } = useSelector(state => ({
    r_songsheetDetail: state.getIn(['songsheet', 'songsheetDetail']),
    r_songList: state.getIn(['songsheet', 'songList']),
    r_hotComment: state.getIn(['songsheet', 'hotComment']),
    r_newComment: state.getIn(['songsheet', 'newComment']),
    r_relatedSongsheet: state.getIn(['songsheet', 'relatedSongsheet'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    if (songsheetId) {
      dispatch(actions.get_songsheetDetail(songsheetId))
      dispatch(actions.get_hotComment(songsheetId, 0, 15))
      dispatch(actions.get_newComment(songsheetId, 0, 20))
      dispatch(actions.get_relatedSongsheet(songsheetId))
    }
    setCurrentPage(1)
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.set_songsheetDetail({}))
      dispatch(actions.set_songList([]))
      dispatch(actions.set_hotComment({}))
      dispatch(actions.set_newComment({}))
      dispatch(actions.set_relatedSongsheet([]))
    }
  }, [dispatch, songsheetId])

  const commentRef = useRef()

  /**
 * other logic
 */
  const handlePageChange = useCallback(page => {
    dispatch(actions.get_newComment(songsheetId, (page - 1) * 20, 20))
    setCurrentPage(page)
    window.scrollTo(0, commentRef.current.offsetTop + 100)
  }, [dispatch, songsheetId])

  const songAreaData = {
    songsheetId: r_songsheetDetail.id,
    playCount: r_songsheetDetail.playCount,
    songCount: r_songsheetDetail.trackCount,
    songList: r_songList
  }

  const commentAreaData = {
    hotComment: r_hotComment,
    newComment: r_newComment
  }

  return (
    <StyledWrapper className="page-songsheet wrap-min-width">
      <ChannelBar />
      <div className="content wrap-v2">
        <div className="left">
          <SongsheetDetail cpnData={r_songsheetDetail} />
          <SongArea cpnData={songAreaData} order name duration artist album />
          <div className="songsheet-comment" ref={commentRef}>
            <CommentArea cpnData={commentAreaData} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
        <div className="right">
          <SimiUser title="喜欢这个歌单的人" cpnData={r_songsheetDetail.subscribers} />
          <SimiSongsheet title="相关推荐" cpnData={r_relatedSongsheet} />
          <DownLoad />
        </div>
      </div>
    </StyledWrapper>
  )
})
