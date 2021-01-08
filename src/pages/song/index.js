import React, { memo } from 'react'

import SongInfo from './c-cpns/song-info'
import SimiPlaylist from './c-cpns/simi-playlist'
import SimiSong from './c-cpns/simi-song'

import {
  StyleWrapper,
  StyleContent,
  StyleLeft,
  StyleRight
} from './style'

export default memo(function Song(props) {

  /**
   * props and state
   */
  const params = new URLSearchParams(props.location.search)

  return (
    <StyleWrapper>
      <StyleContent className="wrap-v2">
        <StyleLeft>
          <SongInfo songId={params.get('id')} />
        </StyleLeft>
        <StyleRight>
          <SimiPlaylist songId={params.get('id')} />
          <SimiSong songId={params.get('id')} />
        </StyleRight>
      </StyleContent>
    </StyleWrapper>
  )
})
