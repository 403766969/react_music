import React, { memo } from 'react'

import { formatUrlWithSize } from '@/utils/formatter'

import { useHistory } from 'react-router-dom'

import {
  StyledWrapper,
  StyledImage,
  StyledDec
} from './style'

export default memo(function AlbumCover(props) {

  /**
   * props and state
   */
  const {
    albumInfo = {},
    imgW = '100px',
    imgH = '100px',
    coverW = '118px',
    coverH = '100px',
    bgPos = '-570px'
  } = props

  /**
   * other hooks
   */
  const history = useHistory()

  /**
   * other logic
   */
  const pushRoute_album = () => {
    history.push(`/album?id=${albumInfo.id}`)
  }

  const pushRoute_artist = () => {
    history.push(`/artist?id=${albumInfo.artist.id}`)
  }

  return (
    <StyledWrapper>
      <StyledImage
        imgW={imgW} imgH={imgH} coverW={coverW} coverH={coverH} bgPos={bgPos}
        onClick={pushRoute_album}>
        <img src={formatUrlWithSize(albumInfo.picUrl, 150)} alt="" />
        <div className="mask sprite_covor" title={albumInfo.name}></div>
      </StyledImage>
      <StyledDec imgW={imgW}>
        <div className="name text-nowrap" onClick={pushRoute_album} title={albumInfo.name}>{albumInfo.name}</div>
        <div className="artist text-nowrap" onClick={pushRoute_artist} title={albumInfo.artist.name}>{albumInfo.artist.name}</div>
      </StyledDec>
    </StyledWrapper>
  )
})
