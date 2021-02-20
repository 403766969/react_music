import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import * as playerAction from '@/pages/player/store/acitonCreators'

import ArtistsDivide from '@/components/artists-divide'

import { StyledWrapper } from './style'

export default memo(function ListItem(props) {

  /**
   * props and state
   */
  const { item, index } = props

  const { orderConfig, nameConfig, durationConfig, artistConfig, albumConfig } = props

  const { showCoverCount } = props

  /**
 * redux hooks
 */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = id => {
    dispatch(playerAction.add_simpleSong(id, true))
  }

  const handleAddClick = id => {
    dispatch(playerAction.add_simpleSong(id, false))
  }

  /**
   * render logic
   */
  let tnsAndAlia = ''

  if ((item.tns && item.tns.length > 0) || (item.alia && item.alia.length > 0)) {
    tnsAndAlia = ' - '
  }

  if (item.tns && item.tns.length > 0) {
    for (let tnsItem of item.tns) {
      tnsAndAlia = tnsAndAlia + '(' + tnsItem + ')/'
    }
  }

  if (item.alia && item.alia.length > 0) {
    for (let aliaItem of item.alia) {
      tnsAndAlia = tnsAndAlia + '(' + aliaItem + ')/'
    }
  }

  tnsAndAlia = tnsAndAlia.slice(0, tnsAndAlia.length - 1)

  return (
    <StyledWrapper className="cpn-list-item">
      {
        orderConfig.isShow && (
          <div className="cell order">
            <div className="content text-nowrap">
              <span>{index + 1}</span>
            </div>
          </div>
        )
      }
      {
        nameConfig.isShow && (
          <div className="cell name">
            <div className="content">
              {
                index < showCoverCount && (
                  <NavLink className="song-cover" to={`/song?id=${item.id}`} title={item.name}>
                    <img src={formatUrlWithSize(item.al.picUrl, 50)} alt={item.name} />
                  </NavLink>
                )
              }
              <i className="sprite_table play-btn" onClick={() => handlePlayClick(item.id)}></i>
              <div className="song-info">
                <div className="song-text text-nowrap">
                  <NavLink className="song-name" to={`/song?id=${item.id}`} title={item.name + tnsAndAlia}>
                    {item.name}
                  </NavLink>
                  <span className="song-tns-alia" title={tnsAndAlia}>{tnsAndAlia}</span>
                  {
                    item.mv !== 0 && (
                      <NavLink className="song-mv" to={`/mv?id=${item.mv}`} title="播放mv">
                        <i className="sprite_table"></i>
                      </NavLink>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        durationConfig.isShow && (
          <div className="cell duration">
            <div className="content text-nowrap">
              <span className="time">{formatDate(item.dt, 'mm:ss')}</span>
            </div>
            <div className="operation">
              <i className="sprite_icon2 btn add" title="添加到播放列表" onClick={() => handleAddClick(item.id)}></i>
              <i className="sprite_table btn favor" title="收藏"></i>
              <i className="sprite_table btn share" title="分享"></i>
              <i className="sprite_table btn download" title="下载"></i>
            </div>
          </div>
        )
      }
      {
        artistConfig.isShow && (
          <div className="cell artist">
            <div className="content text-nowrap">
              <ArtistsDivide artists={item.ar} />
            </div>
          </div>
        )
      }
      {
        albumConfig.isShow && (
          <div className="cell album">
            <div className="content text-nowrap">
              <NavLink className="song-album" to={`/album?id=${item.al.id}`} title={item.al.name}>
                {item.al.name}
              </NavLink>
            </div>
          </div>
        )
      }
    </StyledWrapper>
  )
})
