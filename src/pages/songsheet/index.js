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
  const songsheetId = params.get('id') && parseInt(params.get('id'))

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
    r_hotCommentList,
    r_newCommentList,
    r_newCommentCount,
    r_relatedSongsheetList
  } = useSelector(state => ({
    r_songsheetDetail: state.getIn(['songsheet', 'songsheetDetail']),
    r_songList: state.getIn(['songsheet', 'songList']),
    r_hotCommentList: state.getIn(['songsheet', 'hotCommentList']),
    r_newCommentList: state.getIn(['songsheet', 'newCommentList']),
    r_newCommentCount: state.getIn(['songsheet', 'newCommentCount']),
    r_relatedSongsheetList: state.getIn(['songsheet', 'relatedSongsheetList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    if (songsheetId) {
      dispatch(actions.get_songsheetDetail(songsheetId))
      dispatch(actions.get_hotCommentList(songsheetId, 0, 15))
      dispatch(actions.get_newCommentList(songsheetId, 0, 20))
      dispatch(actions.get_relatedSongsheetList(songsheetId))
    }
    setCurrentPage(1)
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.clear_state())
    }
  }, [dispatch, songsheetId])

  const commentRef = useRef()

  /**
 * other logic
 */
  const handlePageChange = useCallback(page => {
    dispatch(actions.get_newCommentList(songsheetId, (page - 1) * 20, 20))
    setCurrentPage(page)
    window.scrollTo(0, commentRef.current.offsetTop + 100)
  }, [dispatch, songsheetId])

  return (
    <StyledWrapper className="page-songsheet wrap-min-width">
      <ChannelBar />
      <div className="content wrap-v2">
        <div className="left">
          <SongsheetDetail songsheetDetail={r_songsheetDetail} songList={r_songList} />
          <SongArea
            songCount={r_songList && r_songList.length}
            playCount={r_songsheetDetail && r_songsheetDetail.playCount}
            link={r_songsheetDetail && `https://music.163.com/#/outchain/0/${r_songsheetDetail.id}`}
            order name duration artist album
            songList={r_songList} />
          <div className="songsheet-comment" ref={commentRef}>
            <CommentArea
              hotCommentList={r_hotCommentList}
              newCommentList={r_newCommentList}
              newCommentCount={r_newCommentCount}
              currentPage={currentPage}
              onPageChange={handlePageChange} />
          </div>
        </div>
        <div className="right">
          <SimiUser title="喜欢这个歌单的人" userList={r_songsheetDetail && r_songsheetDetail.subscribers} />
          <SimiSongsheet title="相关推荐" songsheetList={r_relatedSongsheetList} />
          <DownLoad />
        </div>
      </div>
    </StyledWrapper>
  )
})
