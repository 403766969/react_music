import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import ArtistCover from '@/components/artist-cover'
import LoadingSpin from '@/components/loading-spin'

import { StyledWrapper } from './style'

export default memo(function ArtistList(props) {

  /**
   * props and state
   */
  const { artistList, isLoading } = props

  return isLoading
    ? (
      <LoadingSpin text="加载中..." />
    )
    : (
      <StyledWrapper className="cpn-artist-list">
        <ul className="cover-content">
          {
            artistList && artistList.slice(0, 10).map(item => {
              return (
                <li className="item" key={item.id}>
                  <ArtistCover artistInfo={item} />
                </li>
              )
            })
          }
        </ul>
        {
          artistList && artistList.length > 10 && (
            <div className="divide" />
          )
        }
        <ul className="text-content">
          {
            artistList && artistList.slice(10).map(item => {
              return (
                <li className="item text-nowrap" key={item.id}>
                  <NavLink className="link" to={`/artist?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                </li>
              )
            })
          }
        </ul>
      </StyledWrapper>
    )
})
