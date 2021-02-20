import React, { memo } from 'react'

import ListHeader from './c-cpn/list-header'
import ListItem from './c-cpn/list-item'

import { StyledWrapper } from './style'

export default memo(function AreaList(props) {

  /**
   * props and state
   */
  const { songList } = props

  const { orderConfig, nameConfig, durationConfig, artistConfig, albumConfig } = props

  const { showCoverCount } = props

  return (
    <StyledWrapper
      className="cpn-song-list"
      orderConfig={orderConfig}
      nameConfig={nameConfig}
      durationConfig={durationConfig}
      artistConfig={artistConfig}
      albumConfig={albumConfig}>
      <ListHeader
        orderConfig={orderConfig}
        nameConfig={nameConfig}
        durationConfig={durationConfig}
        artistConfig={artistConfig}
        albumConfig={albumConfig} />
      <ul className="list-content">
        {
          songList && songList.map((item, index) => {
            return (
              <ListItem
                key={item.id} item={item} index={index}
                orderConfig={orderConfig}
                nameConfig={nameConfig}
                durationConfig={durationConfig}
                artistConfig={artistConfig}
                albumConfig={albumConfig}
                showCoverCount={showCoverCount} />
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
