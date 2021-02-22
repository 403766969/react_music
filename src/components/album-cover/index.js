import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function AlbumCover(props) {

  /**
   * props and state
   */
  const { cpnData = {} } = props

  const { imageWidth = '100px', imageHeight = '100px', coverWidth = '118px', coverHeight = '100px' } = props

  const { backgroundPosition = '-570px' } = props

  /**
   * other hooks
   */
  const history = useHistory()

  /**
   * other logic
   */
  const pushRoute_album = () => {
    if (cpnData.id) {
      history.push(`/album?id=${cpnData.id}`)
    }
  }

  const pushRoute_artist = () => {
    if (cpnData.artist && cpnData.artist.id) {
      history.push(`/artist?id=${cpnData.artist.id}`)
    }
  }

  return Object.keys(cpnData).length > 0 && (
    <StyledWrapper className="cpn-album-cover" imageWidth={imageWidth} imageHeight={imageHeight} coverWidth={coverWidth} coverHeight={coverHeight} backgroundPosition={backgroundPosition}>
      <div className="top-cover" onClick={pushRoute_album}>
        <img src={formatUrlWithSize(cpnData.picUrl, 150)} alt="" />
        <div className="mask sprite_covor" title={cpnData.name}></div>
      </div>
      <div className="bottom-dec">
        <div className="name text-nowrap" onClick={pushRoute_album} title={cpnData.name}>{cpnData.name}</div>
        <div className="artist text-nowrap" onClick={pushRoute_artist} title={cpnData.artist.name}>{cpnData.artist.name}</div>
      </div>
    </StyledWrapper>
  )
})
