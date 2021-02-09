import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function AlbumCover(props) {

  /**
   * props and state
   */
  const {
    albumData = {},
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
    history.push(`/album?id=${albumData.id}`)
  }

  const pushRoute_artist = () => {
    history.push(`/artist?id=${albumData.artist.id}`)
  }

  return Object.keys(albumData).length > 0 && (
    <StyledWrapper className="cpn-album-cover" imgW={imgW} imgH={imgH} coverW={coverW} coverH={coverH} bgPos={bgPos}>
      <div className="top-cover" onClick={pushRoute_album}>
        <img src={formatUrlWithSize(albumData.picUrl, 150)} alt="" />
        <div className="mask sprite_covor" title={albumData.name}></div>
      </div>
      <div className="bottom-dec">
        <div className="name text-nowrap" onClick={pushRoute_album} title={albumData.name}>{albumData.name}</div>
        <div className="artist text-nowrap" onClick={pushRoute_artist} title={albumData.artist.name}>{albumData.artist.name}</div>
      </div>
    </StyledWrapper>
  )
})
