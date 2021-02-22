import React, { memo } from 'react'

import AreaHeader from './c-cpn/area-header'
import SongList from './c-cpn/song-list'

import { StyledWrapper } from './style'

export default memo(function SongArea(props) {

  /**
   * props and state
   */
  const { areaTitle = '歌曲列表' } = props

  const { cpnData = {} } = props

  const { isShowHeader = true, showCoverCount = 0 } = props

  const { order, name, duration, artist, album } = props

  return (
    <StyledWrapper className="cpn-song-area">
      <AreaHeader title={areaTitle} cpnData={cpnData} />
      <SongList
        cpnData={cpnData.songList}
        isShowHeader={isShowHeader}
        showCoverCount={showCoverCount}
        order={order}
        name={name}
        duration={duration}
        artist={artist}
        album={album} />
    </StyledWrapper>
  )
})

