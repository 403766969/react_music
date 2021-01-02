import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getBannerAction } from '../../store/actionCreators'

import { NavLink } from 'react-router-dom'

import { Carousel } from 'antd'

import {
  TopBannerWrapper,
  TopBannerContent,
  TopBannerShow,
  TopBannerDownload,
  TopBannerControl
} from './style'

const renderCarouselItem = item => {
  if (!item) return null
  if (item.targetType === 1) {
    return (
      <NavLink to={`/song?id=${item.targetId}`}>
        <img className="image" src={item.imageUrl} alt={item.typeTitle} />
      </NavLink>
    )
  } else if (item.targetType === 10) {
    return (
      <NavLink to={`/album?id=${item.targetId}`}>
        <img className="image" src={item.imageUrl} alt={item.typeTitle} />
      </NavLink>
    )
  } else {
    return (
      <a href={item.url} target="_blank" rel="noreferrer">
        <img className="image" src={item.imageUrl} alt={item.typeTitle} />
      </a>
    )
  }
}

export default memo(function TopBanner() {

  const [currentIndex, setCurrentIndex] = useState(0)

  const storeState = useSelector(state => ({
    // banner: state.get('recomd').get('banner')
    banner: state.getIn(['recomd', 'banner'])
  }), shallowEqual)

  const dispatch = useDispatch()

  const carouselRef = useRef()

  useEffect(() => {
    dispatch(getBannerAction())
  }, [dispatch])

  const handleChange = useCallback((from, to) => {
    setCurrentIndex(to)
  }, [])

  const bgImage = storeState.banner[currentIndex] && (storeState.banner[currentIndex].imageUrl + '?imageView&blur=40x20')

  return (
    <TopBannerWrapper bgImage={bgImage}>
      <TopBannerContent className="wrap-v2">
        <TopBannerShow>
          <Carousel
            dotPosition="bottom"
            effect="fade"
            autoplay
            ref={carouselRef}
            beforeChange={handleChange}>
            {
              storeState.banner.map(item => (
                <div className="item" key={item.scm}>
                  {renderCarouselItem(item)}
                </div>
              ))
            }
          </Carousel>
        </TopBannerShow>
        <TopBannerDownload>
          <a href="https://music.163.com/#/download" target="_blank" rel="noreferrer">下载客户端</a>
          <span className="shadow"></span>
          <span className="shadow"></span>
        </TopBannerDownload>
        <TopBannerControl>
          <button className="btn left" onClick={carouselRef.current && carouselRef.current.prev}></button>
          <button className="btn right" onClick={carouselRef.current && carouselRef.current.next}></button>
        </TopBannerControl>
      </TopBannerContent>
    </TopBannerWrapper>
  )

})
