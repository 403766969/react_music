import React, { memo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { keywordsMatcher } from '@/utils/parser'

import * as actions from '../../store/actionCreators'

import Pagination from '@/components/pagination-bar'

import ArtistItem from './artist-item'

import { StyledWrapper } from './style'

export default memo(function ResultArtist(props) {

  /**
   * props and state
   */
  const { artistList, artistCount, keywords } = props

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
      window.scrollTo(0, 75)
    }
  }, [dispatch, keywords])

  const kwMatcher = keywordsMatcher(keywords)

  return (
    <StyledWrapper className="cpn-result-artist">
      <ul className="artist-list">
        {
          artistList && artistList.map(item => {
            return (
              <ArtistItem key={item.id} artistInfo={item} kwMatcher={kwMatcher} />
            )
          })
        }
      </ul>
      <div className="footer">
        <Pagination currentPage={currentPage} total={artistCount} pageSize={24} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
