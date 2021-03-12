import React, { memo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { keywordsMatcher } from '@/utils/parser'

import * as actions from '../../store/actionCreators'

import Pagination from '@/components/pagination-bar'

import MvItem from './mv-item'

import { StyledWrapper } from './style'

export default memo(function ResultMv(props) {

  /**
   * props and state
   */
  const { mvList, mvCount, keywords } = props

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
      dispatch(actions.get_mvList(keywords, (page - 1) * 20, 20))
      setCurrentPage(page)
      window.scrollTo(0, 75)
    }
  }, [dispatch, keywords])

  const kwMatcher = keywordsMatcher(keywords)

  return (
    <StyledWrapper className="cpn-result-mv">
      <ul className="mv-list">
        {
          mvList && mvList.map(item => {
            return (
              <MvItem key={item.id} mvInfo={item} kwMatcher={kwMatcher} />
            )
          })
        }
      </ul>
      <div className="footer">
        <Pagination currentPage={currentPage} total={mvCount} pageSize={20} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
