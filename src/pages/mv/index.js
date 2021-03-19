import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import CommentArea from '@/components/comment-area'
import SimiMv from '@/components/simi-mv'
import DownLoad from '@/components/down-load'

import MvDetail from './c-cpns/mv-detail'
import MvDesc from './c-cpns/mv-desc'

import { StyledWrapper } from './style'

export default memo(function Mv(props) {

  /**
   * let and const
   */
  const params = new URLSearchParams(props.location.search)
  const mvId = params.get('id') && parseInt(params.get('id'))

  /**
   * props and state
   */
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux hooks
   */
  const {
    r_mvDetail,
    r_mvUrl,
    r_hotCommentList,
    r_newCommentList,
    r_newCommentCount,
    r_simiMvList
  } = useSelector(state => ({
    r_mvDetail: state.getIn(['mv', 'mvDetail']),
    r_mvUrl: state.getIn(['mv', 'mvUrl']),
    r_hotCommentList: state.getIn(['mv', 'hotCommentList']),
    r_newCommentList: state.getIn(['mv', 'newCommentList']),
    r_newCommentCount: state.getIn(['mv', 'newCommentCount']),
    r_simiMvList: state.getIn(['mv', 'simiMvList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    if (mvId) {
      dispatch(actions.get_mvDetail(mvId))
      dispatch(actions.get_mvUrl(mvId))
      dispatch(actions.get_hotCommentList(mvId, 0, 15))
      dispatch(actions.get_newCommentList(mvId, 0, 20))
      dispatch(actions.get_simiMvList(mvId))
    }
    setCurrentPage(1)
    window.scrollTo(0, 0)
    return () => {
      dispatch(actions.clear_state())
    }
  }, [dispatch, mvId])

  const commentRef = useRef()

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    dispatch(actions.get_newCommentList(mvId, (page - 1) * 20, 20))
    setCurrentPage(page)
    window.scrollTo(0, commentRef.current.offsetTop + 100)
  }, [dispatch, mvId])

  return (
    <StyledWrapper className="page-mv wrap-v3">
      <div className="left">
        <MvDetail mvDetail={r_mvDetail} mvUrl={r_mvUrl} />
        <div className="mv-comment" ref={commentRef}>
          <CommentArea
            hotCommentList={r_hotCommentList}
            newCommentList={r_newCommentList}
            newCommentCount={r_newCommentCount}
            currentPage={currentPage}
            onPageChange={handlePageChange} />
        </div>
      </div>
      <div className="right">
        <MvDesc mvDetail={r_mvDetail} />
        <SimiMv title="相关推荐" mvList={r_simiMvList} />
        <DownLoad />
      </div>
    </StyledWrapper>
  )
})
