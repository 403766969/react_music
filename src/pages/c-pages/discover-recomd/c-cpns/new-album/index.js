import React, { memo, useRef } from 'react'

import { Carousel } from 'antd'

import HeaderLong from '@/components/header-long'
import AlbumCover from '@/components/album-cover'

import { StyledWrapper } from './style'

export default memo(function NewAlbum(props) {

  /**
   * props and state
   */
  const { cpnData = [] } = props

  /**
   * other hooks
   */
  const carouselRef = useRef()

  return (
    <StyledWrapper className="cpn-new-album">
      <HeaderLong title="新碟上架" more={{ text: '更多', link: '/discover/album' }} />
      <div className="panel">
        <div className="content">
          <Carousel ref={carouselRef} dots={false}>
            {
              [0, 1].map(page => {
                return (
                  <div className="carousel-page" key={page}>
                    {
                      cpnData.slice(page * 5, (page + 1) * 5).map(item => {
                        return (
                          <AlbumCover key={item.id} albumData={item} />
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div className="control">
          <span className="arrow arrow-left sprite_02" onClick={() => carouselRef.current.prev()}></span>
          <span className="arrow arrow-right sprite_02" onClick={() => carouselRef.current.next()}></span>
        </div>
      </div>
    </StyledWrapper>
  )
})
