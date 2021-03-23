import React, { memo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { keywordsMatcher } from '@/utils/parser'

import * as actions from '../../store/actionCreators'

import PaginationBar from '@/components/pagination-bar'
import LoadingSpin from '@/components/loading-spin'

import AlbumItem from './album-item'

import { StyledWrapper } from './style'

export default memo(function ResultAlbum(props) {

  /**
   * props and state
   */
  const { albumList, albumCount, keywords, isLoading } = props

  const [currentPage, setCurrentPage] = useState(1)

  /**
   * redux
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    if (keywords) {
      dispatch(actions.get_albumList(keywords, (page - 1) * 20, 20))
      setCurrentPage(page)
    }
  }, [dispatch, keywords])

  const kwMatcher = keywordsMatcher(keywords)

  return (
    <StyledWrapper className="cpn-result-album">
      {
        isLoading
          ? (
            <LoadingSpin text="加载中..." />
          )
          : (
            <ul className="album-list">
              {
                albumList && albumList.map(item => {
                  return (
                    <AlbumItem key={item.id} albumInfo={item} kwMatcher={kwMatcher} />
                  )
                })
              }
            </ul>
          )
      }
      <div className="footer">
        <PaginationBar currentPage={currentPage} total={albumCount} pageSize={20} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
