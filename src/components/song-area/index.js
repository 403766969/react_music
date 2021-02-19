import React, { memo } from 'react'

import AreaHeader from './c-cpn/area-header'
import AreaList from './c-cpn/area-list'

import { StyledWrapper } from './style'

export default memo(function SongArea(props) {

  /**
   * props and state
   */
  const { areaTitle = '歌曲列表', songsheetId, playCount = 0, songCount = 0, songList } = props

  const { order, name, duration, artist, album } = props

  const { showCoverCount = 0 } = props

  /**
   * other render
   */
  const orderText = order && order.text
  const nameText = name && name.text
  const durationText = duration && duration.text
  const artistText = artist && artist.text
  const albumText = album && album.text

  const orderConfig = {
    isShow: order ? true : false,
    text: (orderText !== undefined && orderText !== null) ? orderText : '',
    flex: (order && order.flex) || 'none',
    width: (order && order.width) || '45px'
  }

  const nameConfig = {
    isShow: name ? true : false,
    text: (nameText !== undefined && nameText !== null) ? nameText : '标题',
    flex: (name && name.flex) || '1',
    width: (name && name.width) || '0'
  }

  const durationConfig = {
    isShow: duration ? true : false,
    text: (durationText !== undefined && durationText !== null) ? durationText : '时长',
    flex: (duration && duration.flex) || 'none',
    width: (duration && duration.width) || '90px'
  }

  const artistConfig = {
    isShow: artist ? true : false,
    text: (artistText !== undefined && artistText !== null) ? artistText : '歌手',
    flex: (artist && artist.flex) || 'none',
    width: (artist && artist.width) || '110px'
  }

  const albumConfig = {
    isShow: album ? true : false,
    text: (albumText !== undefined && albumText !== null) ? albumText : '专辑',
    flex: (album && album.flex) || 'none',
    width: (album && album.width) || '110px'
  }

  return (
    <StyledWrapper className="cpn-song-area">
      <AreaHeader areaTitle={areaTitle} playCount={playCount} songCount={songCount} songsheetId={songsheetId} />
      <AreaList
        songList={songList}
        orderConfig={orderConfig}
        nameConfig={nameConfig}
        durationConfig={durationConfig}
        artistConfig={artistConfig}
        albumConfig={albumConfig}
        showCoverCount={showCoverCount} />
    </StyledWrapper>
  )
})

