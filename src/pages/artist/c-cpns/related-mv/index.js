import React, { memo, useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../../store/actionCreators'

import PaginationBar from '@/components/pagination-bar'
import LoadingSpin from '@/components/loading-spin'

import MvCover from '@/components/mv-cover'

import { StyledWrapper } from './style'

export default memo(function RelatedMv(props) {

  /**
   * props and state
   */
  const { artistId, mvList, mvCount, isLoading } = props

  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const listRef = useRef()

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    if (artistId) {
      dispatch(actions.get_mvList(artistId, (page - 1) * 12, 12))
      setCurrentPage(page)
      window.scrollTo(0, listRef.current.offsetTop - 60)
    }
  }, [dispatch, artistId])

  return (
    <StyledWrapper className="cpn-related-mv">
      {
        isLoading
          ? (
            <LoadingSpin text="加载中..." />
          )
          : (
            <ul className="mv-list" ref={listRef}>
              {
                mvList && mvList.map(item => {
                  return (
                    <li className="mv-item" key={item.id}>
                      <MvCover mvInfo={item} name />
                    </li>
                  )
                })
              }
            </ul>
          )
      }
      <div className="footer">
        <PaginationBar currentPage={currentPage} total={mvCount} pageSize={12} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
