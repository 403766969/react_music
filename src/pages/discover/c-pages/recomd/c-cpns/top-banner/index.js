import React, { memo, useState, useRef, useCallback } from 'react'

import { NavLink } from 'react-router-dom'

import { Carousel } from 'antd'

import {
  StyledWrapper,
  StyledContent,
  StyledShow,
  StyledDownload,
  StyledControl
} from './style'

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
    default:
      return (
        <a href={item.url} target="_blank" rel="noreferrer">
          <img className="image" src={item.imageUrl} alt={item.typeTitle} />
        </a>
      )
  }
}

export default memo(function TopBanner(props) {

  /**
   * props and state
   */
  const { carouselImages = [] } = props

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

  const bgImage = carouselImages[currentIndex] && (carouselImages[currentIndex].imageUrl + '?imageView&blur=40x20')

  return (
    <StyledWrapper bgImage={bgImage}>
      <StyledContent className="wrap-v2">
        <StyledShow>
          <Carousel
            dotPosition="bottom"
            effect="fade"
            autoplay
            ref={carouselRef}
            beforeChange={handleChange}>
            {
              carouselImages.map(item => (
                <div className="item" key={item.scm}>
                  {renderCarouselItem(item)}
                </div>
              ))
            }
          </Carousel>
        </StyledShow>
        <StyledDownload>
          <a href="https://music.163.com/#/download" target="_blank" rel="noreferrer">下载客户端</a>
          <span className="shadow"></span>
          <span className="shadow"></span>
        </StyledDownload>
        <StyledControl>
          <button className="btn left" onClick={carouselRef.current && carouselRef.current.prev}></button>
          <button className="btn right" onClick={carouselRef.current && carouselRef.current.next}></button>
        </StyledControl>
      </StyledContent>
    </StyledWrapper>
  )
})
