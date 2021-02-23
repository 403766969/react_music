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
  const { index = 0, cpnData = {} } = props

  const { showCoverCount = 0 } = props

  const { orderConfig = {}, nameConfig = {}, durationConfig = {}, artistConfig = {}, albumConfig = {} } = props

  /**
 * redux hooks
 */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = item => {
    dispatch(playerAction.add_simpleSong_with_songObject(item, true))
  }

  const handleAddClick = item => {
    dispatch(playerAction.add_simpleSong_with_songObject(item, false))
  }

  /**
   * render logic
   */
  let tnsAndAlia = ''

  if ((cpnData.tns && cpnData.tns.length > 0) || (cpnData.alia && cpnData.alia.length > 0)) {
    tnsAndAlia = ' - '
  }

  if (cpnData.tns && cpnData.tns.length > 0) {
    for (let tnsItem of cpnData.tns) {
      tnsAndAlia = tnsAndAlia + '(' + tnsItem + ')/'
    }
  }

  if (cpnData.alia && cpnData.alia.length > 0) {
    for (let aliaItem of cpnData.alia) {
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
                  <NavLink className="song-cover" to={`/song?id=${cpnData.id}`} title={cpnData.name}>
                    <img src={formatUrlWithSize(cpnData.al.picUrl, 50)} alt={cpnData.name} />
                  </NavLink>
                )
              }
              <i className="sprite_table play-btn" onClick={() => handlePlayClick(cpnData)}></i>
              <div className="song-info">
                <div className="song-text text-nowrap">
                  <NavLink className="song-name" to={`/song?id=${cpnData.id}`} title={cpnData.name + tnsAndAlia}>
                    {cpnData.name}
                  </NavLink>
                  <span className="song-tns-alia" title={tnsAndAlia}>{tnsAndAlia}</span>
                  {
                    cpnData.mv !== 0 && (
                      <NavLink className="song-mv" to={`/mv?id=${cpnData.mv}`} title="播放mv">
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
              <span className="time">{formatDate(cpnData.dt, 'mm:ss')}</span>
            </div>
            <div className="operation">
              <i className="sprite_icon2 btn add" title="添加到播放列表" onClick={() => handleAddClick(cpnData)}></i>
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
              <ArtistsDivide cpnData={cpnData.ar} />
            </div>
          </div>
        )
      }
      {
        albumConfig.isShow && (
          <div className="cell album">
            <div className="content text-nowrap">
              <NavLink className="song-album" to={`/album?id=${cpnData.al.id}`} title={cpnData.al.name}>
                {cpnData.al.name}
              </NavLink>
            </div>
          </div>
        )
      }
    </StyledWrapper>
  )
})
