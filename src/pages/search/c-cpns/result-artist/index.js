import React, { memo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'
import { renderText, keywordsMatcher } from '@/utils/parser'

import * as actions from '../../store/actionCreators'

import Pagination from '@/components/pagination-bar'

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
              <li className="artist-item" key={item.id}>
                <div className="cover">
                  <NavLink to={`/artist?id=${item.id}`} title={item.name}>
                    <img src={formatUrlWithSize(item.img1v1Url || item.picUrl, 130, 130, 'y')} alt="" />
                    <span className="sprite_covor mask"></span>
                  </NavLink>
                </div>
                <p className="desc text-nowrap">
                  <NavLink className="link" to={`/artist?id=${item.id}`} title={item.name}>
                    {
                      renderText(item.name, kwMatcher)
                    }
                  </NavLink>
                </p>
              </li>
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
