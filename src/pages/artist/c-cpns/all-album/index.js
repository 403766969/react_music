import React, { memo, useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../../store/actionCreators'

import AlbumCover from '@/components/album-cover'
import PaginationBar from '@/components/pagination-bar'
import LoadingSpin from '@/components/loading-spin'

import { StyledWrapper } from './style'

export default memo(function AllAlbum(props) {

  /**
   * props and state
   */
  const { artistId, albumList, albumCount, isLoading } = props

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
      dispatch(actions.get_albumList(artistId, (page - 1) * 12, 12))
      setCurrentPage(page)
      window.scrollTo(0, listRef.current.offsetTop - 60)
    }
  }, [dispatch, artistId])

  return (
    <StyledWrapper className="cpn-all-album">
      {
        isLoading
          ? (
            <LoadingSpin text="加载中..." />
          )
          : (
            <ul className="album-list" ref={listRef}>
              {
                albumList && albumList.map(item => {
                  return (
                    <li className="album-item" key={item.id}>
                      <AlbumCover
                        albumInfo={item}
                        imageWidth={120}
                        imageHeight={120}
                        maskWidth={145}
                        maskHeight={120}
                        posX={-170}
                        posY={-850}
                        name
                        time />
                    </li>
                  )
                })
              }
            </ul>
          )
      }
      <div className="footer">
        <PaginationBar currentPage={currentPage} total={albumCount} pageSize={12} onPageChange={handlePageChange} />
      </div>
    </StyledWrapper>
  )
})
