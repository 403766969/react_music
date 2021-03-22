import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatDate } from '@/utils/formatter'

import ArtistDivide from '@/components/artist-divide'

import { StyledWrapper } from './style'

export default memo(function PlayerList(props) {

  /**
   * props and state
   */
  const { songList, currentIndex } = props

  const { handleItemClick, handleRemoveClick } = props

  return (
    <StyledWrapper className="cpn-player-list">
      {
        songList && songList.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`list-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleItemClick(index)}>
              <div className="left">
                <div className="song text-nowrap">
                  {item.name}
                </div>
              </div>
              <div className="right">
                <div className="operation" onClick={e => e.stopPropagation()}>
                  <i className="sprite_playlist favor" title="收藏"></i>
                  <i className="sprite_playlist share" title="分享"></i>
                  <i className="sprite_playlist download" title="下载"></i>
                  <i className="sprite_playlist remove" title="删除" onClick={() => handleRemoveClick(index)}></i>
                </div>
                <div className="artists text-nowrap" onClick={e => e.stopPropagation()}>
                  <ArtistDivide artistList={item.ar} />
                </div>
                <div className="duration">{formatDate(item.dt, 'mm:ss')}</div>
                <div className="sprite_playlist source" onClick={e => e.stopPropagation()}>
                  {
                    item.sourceLink
                      ? (
                        <NavLink className="link" to={item.sourceLink} title="来源">来源</NavLink>
                      )
                      : (
                        <span className="link" title="暂无来源">暂无来源</span>
                      )
                  }
                </div>
              </div>
            </li>
          )
        })
      }
    </StyledWrapper>
  )
})
