import React, { memo } from 'react'

import {
  getUrlWithSize
} from '@/utils/format-utils'

import { useHistory } from 'react-router-dom'

import {
  AlbumCoverWrapper,
  AlbumCoverImage,
  AlbumCoverDec
} from './style'

export default memo(function AlbumCover(props) {
  const {
    albumInfo = {},
    imgW = '100px',
    imgH = '100px',
    coverW = '118px',
    coverH = '100px',
    bgPos = '-570px'
  } = props

  const history = useHistory()

  const pushRoute_album = () => {
    history.push(`/album?id=${albumInfo.id}`)
  }

  const pushRoute_artist = () => {
    history.push(`/artist?id=${albumInfo.artist.id}`)
  }

  return (
    <AlbumCoverWrapper>
      <AlbumCoverImage
        imgW={imgW} imgH={imgH} coverW={coverW} coverH={coverH} bgPos={bgPos}
        onClick={pushRoute_album}>
        <img src={getUrlWithSize(albumInfo.picUrl, 150)} alt="" />
        <div className="mask sprite_covor"></div>
      </AlbumCoverImage>
      <AlbumCoverDec imgW={imgW}>
        <div className="name text-nowrap" onClick={pushRoute_album}>{albumInfo.name}</div>
        <div className="artist text-nowrap" onClick={pushRoute_artist}>{albumInfo.artist.name}</div>
      </AlbumCoverDec>
    </AlbumCoverWrapper>
  )
})
