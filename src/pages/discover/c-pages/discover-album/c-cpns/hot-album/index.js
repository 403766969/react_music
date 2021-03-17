import React, { memo } from 'react'

import AlbumCover from '@/components/album-cover'

import { StyledWrapper } from './style'

export default memo(function HotAlbum(props) {

  /**
   * props and state
   */
  const { hotAlbumList } = props

  return (
    <StyledWrapper className="cpn-hot-album">
      <div className="header">
        <h3 className="title">热门新碟</h3>
      </div>
      <ul className="list">
        {
          hotAlbumList && hotAlbumList.map(item => {
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
