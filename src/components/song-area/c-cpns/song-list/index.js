import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import ListHeader from './c-cpn/list-header'
import ListItem from './c-cpn/list-item'

import { StyledWrapper } from './style'

export default memo(function AreaList(props) {

  /**
   * props and state
   */
  const { isShowHeader = true, showCoverCount = 0 } = props

  const { order, name, duration, artist, album } = props

  const { songList } = props

  /**
   * redux hooks
   */
  const {
    player_songList,
    player_currentIndex
  } = useSelector(state => ({
    player_songList: state.getIn(['player', 'songList']),
    player_currentIndex: state.getIn(['player', 'currentIndex'])
  }), shallowEqual)

  const currentSongId = player_songList && player_songList[player_currentIndex] && player_songList[player_currentIndex].id

  /**
   * render logic
   */
  const orderConfig = order
    ? {
      text: (order.text !== undefined && order.text !== null) ? order.text : '',
      flex: order.flex || 'none',
      width: order.width || '45px'
    }
    : null

  const nameConfig = name
    ? {
      text: (name.text !== undefined && name.text !== null) ? name.text : '标题',
      flex: name.flex || '1',
      width: name.width || '0'
    }
    : null

  const durationConfig = duration
    ? {
      text: (duration.text !== undefined && duration.text !== null) ? duration.text : '时长',
      flex: duration.flex || 'none',
      width: duration.width || '90px'
    }
    : null

  const artistConfig = artist
    ? {
      text: (artist.text !== undefined && artist.text !== null) ? artist.text : '歌手',
      flex: artist.flex || 'none',
      width: artist.width || '110px'
    }
    : null

  const albumConfig = album
    ? {
      text: (album.text !== undefined && album.text !== null) ? album.text : '专辑',
      flex: album.flex || 'none',
      width: album.width || '110px'
    }
    : null

  return (
    <StyledWrapper
      className="cpn-song-list"
      orderConfig={orderConfig}
      nameConfig={nameConfig}
      durationConfig={durationConfig}
      artistConfig={artistConfig}
      albumConfig={albumConfig}>
      {
        isShowHeader && (
          <ListHeader
            orderConfig={orderConfig}
            nameConfig={nameConfig}
            durationConfig={durationConfig}
            artistConfig={artistConfig}
            albumConfig={albumConfig} />
        )
      }
      <ul className="list-content">
        {
          songList && songList.map((item, index) => {
            return (
              <ListItem
                key={item.id} index={index} songInfo={item} active={item.id === currentSongId}
                showCoverCount={showCoverCount}
                orderConfig={orderConfig}
                nameConfig={nameConfig}
                durationConfig={durationConfig}
                artistConfig={artistConfig}
                albumConfig={albumConfig} />
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
