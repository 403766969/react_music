import React, { memo, useState, useRef, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import { Carousel } from 'antd'

import { StyledWrapper } from './style'

export default memo(function TopBanner(props) {

  /**
   * props and state
   */
  const { topBannerList = [] } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  /**
   * other hooks
   */
  const carouselRef = useRef()

  /**
   * other logic
   */
  const handleChange = useCallback((from, to) => {
    setCurrentIndex(to)
  }, [])

  /**
   * render
   */
  const renderCarouselItem = item => {
    switch (item.targetType) {
      case 1:
        return (
          <NavLink to={`/song?id=${item.targetId}`}>
            <img className="image" src={item.imageUrl} alt={item.typeTitle} />
          </NavLink>
        )
      case 10:
        return (
          <NavLink to={`/album?id=${item.targetId}`}>
            <img className="image" src={item.imageUrl} alt={item.typeTitle} />
          </NavLink>
        )
      case 1004:
        return (
          <NavLink to={`/mv?id=${item.targetId}`}>
            <img className="image" src={item.imageUrl} alt={item.typeTitle} />
          </NavLink>
        )
      default:
        return (
          <a href={item.url} target="_blank" rel="noreferrer">
            <img className="image" src={item.imageUrl} alt={item.typeTitle} />
          </a>
        )
    }
  }

  const bgImage = topBannerList[currentIndex] && (topBannerList[currentIndex].imageUrl + '?imageView&blur=40x20')

  return topBannerList.length > 0 && (
    <StyledWrapper className="cpn-top-banner" bgImage={bgImage}>
      <div className="content wrap-v2">
        <div className="carousel-show">
          <Carousel
            dotPosition="bottom"
            effect="fade"
            autoplay
            ref={carouselRef}
            beforeChange={handleChange}>
            {
              topBannerList.map(item => (
                <div className="item" key={item.scm}>
                  {renderCarouselItem(item)}
                </div>
              ))
            }
          </Carousel>
        </div>
        <div className="download">
          <a href="https://music.163.com/#/download" target="_blank" rel="noreferrer">下载客户端</a>
          <span className="shadow"></span>
          <span className="shadow"></span>
        </div>
        <div className="control">
          <button className="btn left" onClick={() => carouselRef.current.prev()}></button>
          <button className="btn right" onClick={() => carouselRef.current.next()}></button>
        </div>
      </div>
    </StyledWrapper>
  )
})
