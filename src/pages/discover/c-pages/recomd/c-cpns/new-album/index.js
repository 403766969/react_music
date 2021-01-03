import React, { memo, useEffect, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getTopAlbumAction } from '../../store/actionCreators'

import { Carousel } from 'antd'

import HeaderRecomd from '@/components/header-recomd'
import AlbumCover from '@/components/album-cover'

import {
  NewAlbumWrapper,
  NewAlbumPanel,
  NewAlbumContent,
  NewAlbumPage,
  NewAlbumControl
} from './style'

export default memo(function NewAlbum() {
  const title = '新碟上架'
  const more = {
    title: '更多',
    link: '/discover/album'
  }

  const carouselRef = useRef()

  const storeState = useSelector(state => ({
    topAlbum: state.getIn(['recomd', 'topAlbum'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopAlbumAction(10, 0))
  }, [dispatch])

  return (
    <NewAlbumWrapper>
      <HeaderRecomd title={title} more={more} />
      <NewAlbumPanel>
        <NewAlbumContent>
          <Carousel ref={carouselRef} dots={false}>
            {
              [0, 1].map(page => {
                return (
                  <NewAlbumPage key={page}>
                    {
                      storeState.topAlbum.slice(page * 5, (page + 1) * 5).map(item => {
                        return (
                          <AlbumCover key={item.id} albumInfo={item} />
                        )
                      })
                    }
                  </NewAlbumPage>
                )
              })
            }
          </Carousel>
        </NewAlbumContent>
        <NewAlbumControl>
          <span className="arrow arrow-left sprite_02" onClick={e => carouselRef.current.prev()}></span>
          <span className="arrow arrow-right sprite_02" onClick={e => carouselRef.current.next()}></span>
        </NewAlbumControl>
      </NewAlbumPanel>
    </NewAlbumWrapper>
  )
})
