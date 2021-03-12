import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import ChannelBar from '@/components/channel-bar'
import SongArea from '@/components/song-area'
import CommentArea from '@/components/comment-area'
import SimiAlbum from '@/components/simi-album'
import DownLoad from '@/components/down-load'

import AlbumDetail from './c-cpns/album-detial'
import AlbumDesc from './c-cpns/album-desc'

import { StyledWrapper } from './style'

export default memo(function Album(props) {

  /**
   * let and const
   */
  const params = new URLSearchParams(props.location.search)
  const albumId = params.get('id') && parseInt(params.get('id'))

  /**
   * props and state
   */
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux hooks
   */
  const {
    r_albumDetail,
    r_songList,
    r_hotCommentList,
    r_newCommentList,
    r_newCommentCount,
    r_relatedAlbumList
  } = useSelector(state => ({
    r_albumDetail: state.getIn(['album', 'albumDetail']),
    r_songList: state.getIn(['album', 'songList']),
    r_hotCommentList: state.getIn(['album', 'hotCommentList']),
    r_newCommentList: state.getIn(['album', 'newCommentList']),
    r_newCommentCount: state.getIn(['album', 'newCommentCount']),
    r_relatedAlbumList: state.getIn(['album', 'relatedAlbumList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    if (albumId) {
      dispatch(actions.get_albumDetail(albumId))
      dispatch(actions.get_hotCommentList(albumId, 0, 15))
      dispatch(actions.get_newCommentList(albumId, 0, 20))
    }
    setCurrentPage(1)
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.clear_state())
    }
  }, [dispatch, albumId])

  const commentRef = useRef()

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    dispatch(actions.get_newCommentList(albumId, (page - 1) * 20, 20))
    setCurrentPage(page)
    window.scrollTo(0, commentRef.current.offsetTop + 100)
  }, [dispatch, albumId])

  return (
    <StyledWrapper className="page-album">
      <ChannelBar />
      <div className="content wrap-v3">
        <div className="left">
          <AlbumDetail albumDetail={r_albumDetail} commentCount={r_newCommentCount} songList={r_songList} />
          <AlbumDesc albumDesc={r_albumDetail && r_albumDetail.description} />
          <SongArea
            songCount={r_songList && r_songList.length}
            songList={r_songList}
            link={r_albumDetail && `https://music.163.com/#/outchain/1/${r_albumDetail && r_albumDetail.id}`}
            order name duration artist={{ width: '130px' }} />
          <div className="album-comment" ref={commentRef}>
            <CommentArea
              hotCommentList={r_hotCommentList}
              newCommentList={r_newCommentList}
              newCommentCount={r_newCommentCount}
              currentPage={currentPage}
              onPageChange={handlePageChange} />
          </div>
        </div>
        <div className="right">
          <SimiAlbum title="Ta的其他热门专辑" albumList={r_relatedAlbumList} />
          <DownLoad />
        </div>
      </div>
    </StyledWrapper>
  )
})
