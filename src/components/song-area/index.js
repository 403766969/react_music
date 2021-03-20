import React, { memo } from 'react'

import AreaHeader from './c-cpns/area-header'
import SongList from './c-cpns/song-list'

import { StyledWrapper } from './style'

export default memo(function SongArea(props) {

  /**
   * props and state
   */
  const { songCount, playCount, link } = props

  const { isShowHeader, showCoverCount } = props

  const { order, name, duration, artist, album } = props

  const { isLoading } = props

  const { songList, sourceLink } = props

  return (
    <StyledWrapper className="cpn-song-area">
      <AreaHeader title="歌曲列表" songCount={songCount} playCount={playCount} link={link} />
      <SongList
        isShowHeader={isShowHeader}
        showCoverCount={showCoverCount}
        order={order}
        name={name}
        duration={duration}
        artist={artist}
        album={album}
        isLoading={isLoading}
        songList={songList}
        sourceLink={sourceLink} />
    </StyledWrapper>
  )
})

