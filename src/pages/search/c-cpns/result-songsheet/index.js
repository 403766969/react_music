import React, { memo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { keywordsMatcher } from '@/utils/parser'

import * as actions from '../../store/actionCreators'

import PaginationBar from '@/components/pagination-bar'
import LoadingSpin from '@/components/loading-spin'

import SongsheetItem from './songsheet-item'

import { StyledWrapper } from './style'

export default memo(function ResultSongsheet(props) {

  /**
   * props and state
   */
  const { songsheetList, songsheetCount, keywords, isLoading } = props

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
      dispatch(actions.get_songsheetList(keywords, (page - 1) * 20, 20))
      setCurrentPage(page)
    }
  }, [dispatch, keywords])

  const kwMatcher = keywordsMatcher(keywords)

  return (
    <StyledWrapper className="cpn-result-songsheet">
      {
        isLoading
          ? (
            <LoadingSpin text="加载中..." />
          )
          : (
            <ul className="songsheet-list">
              {
                songsheetList && songsheetList.map(item => {
                  return (
                    <SongsheetItem key={item.id} songsheetInfo={item} kwMatcher={kwMatcher} />
                  )
                })
              }
            </ul>
          )
      }
      <div className="footer">
        <PaginationBar currentPage={currentPage} total={songsheetCount} pageSize={20} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
