import React, { memo } from 'react'

import SongInfo from './c-cpns/song-info'
import SongSongs from './c-cpns/song-songs'
import SimiSong from './c-cpns/simi-song'

import {
  StyleWrapper,
  StyleContent,
  StyleLeft,
  StyleRight
} from './style'

export default memo(function Song(props) {

  const params = new URLSearchParams(props.location.search)

  return (
    <StyleWrapper>
      <StyleContent className="wrap-v2">
        <StyleLeft>
          <SongInfo songId={params.get('id')} />
        </StyleLeft>
        <StyleRight>
          <SongSongs songId={params.get('id')} />
          <SimiSong songId={params.get('id')} />
        </StyleRight>
      </StyleContent>
    </StyleWrapper>
  )
})
