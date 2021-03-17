import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { allAlbumLinks } from '@/services/local-data'

import AlbumCover from '@/components/album-cover'

import { StyledWrapper } from './style'

export default memo(function AllAlbum(props) {

  /**
   * props and state
   */
  const { allAlbumList } = props

  return (
    <StyledWrapper className="cpn-all-album">
      <div className="header">
        <h3 className="title">全部新碟</h3>
        <ul className="links">
          {
            allAlbumLinks && allAlbumLinks.map(item => {
              return (
                <li className="item" key={item.title}>
                  <NavLink className="link" to={item.link}>{item.title}</NavLink>
                  <span className="divider">|</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <ul className="list">
        {
          allAlbumList && allAlbumList.map(item => {
            return (
              <li className="item" key={item.id}>
                <AlbumCover
                  albumInfo={item}
                  imageWidth={130}
                  imageHeight={130}
                  maskWidth={153}
                  maskHeight={130}
                  posX={0}
                  posY={-845}
                  name
                  artist />
              </li>
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
