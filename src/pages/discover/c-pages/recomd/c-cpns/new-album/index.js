import React, { memo, useEffect, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { action_get_newAlbumList } from '../../store/actionCreators'

import { Carousel } from 'antd'

import HeaderRecomd from '@/components/header-recomd'
import AlbumCover from '@/components/album-cover'

import {
  StyledWrapper,
  StyledPanel,
  StyledContent,
  StyledPage,
  StyledControl
} from './style'

export default memo(function NewAlbum() {

  /**
   * redux hooks
   */
  const { newAlbumList: r_newAlbumList } = useSelector(state => ({
    newAlbumList: state.getIn(['recomd', 'newAlbumList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const carouselRef = useRef()

  useEffect(() => {
    dispatch(action_get_newAlbumList(10, 0))
  }, [dispatch])

  return (
    <StyledWrapper>
      <HeaderRecomd title="新碟上架" more={{ text: '更多', link: '/discover/album' }} />
      <StyledPanel>
        <StyledContent>
          <Carousel ref={carouselRef} dots={false}>
            {
              [0, 1].map(page => {
                return (
                  <StyledPage key={page}>
                    {
                      r_newAlbumList.slice(page * 5, (page + 1) * 5).map(item => {
                        return (
                          <AlbumCover key={item.id} albumInfo={item} />
                        )
                      })
                    }
                  </StyledPage>
                )
              })
            }
          </Carousel>
        </StyledContent>
        <StyledControl>
          <span className="arrow arrow-left sprite_02" onClick={e => carouselRef.current.prev()}></span>
          <span className="arrow arrow-right sprite_02" onClick={e => carouselRef.current.next()}></span>
        </StyledControl>
      </StyledPanel>
    </StyledWrapper>
  )
})
