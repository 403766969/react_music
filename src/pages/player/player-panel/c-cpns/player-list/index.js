import React, { memo } from 'react'

import { formatDate } from '@/utils/formatter'

import ArtistDivide from '@/components/artist-divide'

import { StyledWrapper } from './style'

export default memo(function PlayerList(props) {

  /**
   * props and state
   */
  const { dispatch, actions, songList, currentIndex } = props

  /**
   * other logic
   */
  const hadleRemoveClick = (index, e) => {
    e.stopPropagation()
    dispatch(actions.remove_song(index))
  }

  return (
    <StyledWrapper className="cpn-player-list">
      {
        songList && songList.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`list-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => dispatch(actions.toggle_song(index))}>
              <div className="left">
                <div className="song text-nowrap">
                  {item.name}
                </div>
              </div>
              <div className="right">
                <div className="operation">
                  <i className="sprite_playlist favor" title="收藏"></i>
                  <i className="sprite_playlist share" title="分享"></i>
                  <i className="sprite_playlist download" title="下载"></i>
                  <i className="sprite_playlist remove" title="删除" onClick={e => hadleRemoveClick(index, e)}></i>
                </div>
                <div className="artists text-nowrap" onClick={e => e.stopPropagation()}>
                  <ArtistDivide artistList={item.ar} />
                </div>
                <div className="duration">{formatDate(item.dt, 'mm:ss')}</div>
                <div className="sprite_playlist link" title="来自榜单"></div>
              </div>
            </li>
          )
        })
      }
    </StyledWrapper>
  )
})