import React, { memo } from 'react'

import ListHeader from './c-cpn/list-header'
import ListItem from './c-cpn/list-item'

import { StyledWrapper } from './style'

export default memo(function AreaList(props) {

  /**
   * props and state
   */
  const { cpnData = [] } = props

  const { isShowHeader = true, showCoverCount = 0 } = props

  const { order, name, duration, artist, album } = props

  /**
   * render logic
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
          cpnData.map((item, index) => {
            return (
              <ListItem
                key={item.id} index={index} cpnData={item}
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
