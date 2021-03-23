import React, { memo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { keywordsMatcher } from '@/utils/parser'

import * as actions from '../../store/actionCreators'

import PaginationBar from '@/components/pagination-bar'
import LoadingSpin from '@/components/loading-spin'

import ArtistItem from './artist-item'

import { StyledWrapper } from './style'

export default memo(function ResultArtist(props) {

  /**
   * props and state
   */
  const { artistList, artistCount, keywords, isLoading } = props

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
      dispatch(actions.get_artistList(keywords, (page - 1) * 24, 24))
      setCurrentPage(page)
    }
  }, [dispatch, keywords])

  const kwMatcher = keywordsMatcher(keywords)

  return (
    <StyledWrapper className="cpn-result-artist">
      {
        isLoading
          ? (
            <LoadingSpin text="加载中..." />
          )
          : (
            <ul className="artist-list">
              {
                artistList && artistList.map(item => {
                  return (
                    <ArtistItem key={item.id} artistInfo={item} kwMatcher={kwMatcher} />
                  )
                })
              }
            </ul>
          )
      }
      <div className="footer">
        <PaginationBar currentPage={currentPage} total={artistCount} pageSize={24} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
