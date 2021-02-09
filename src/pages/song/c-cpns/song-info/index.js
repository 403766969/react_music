import React, { memo } from 'react'

import { formatUrlWithSize } from '@/utils/formatter'

import { NavLink } from 'react-router-dom'

import ArtistsDivide from '@/components/artists-divide'
import OperationBar from '@/components/operation-bar'

import SongLyric from '../song-lyric'

import { StyleWrapper } from './style'

export default memo(function songInfo(props) {

  /**
   * props and state
   */
  const { songData = {}, songLyric = [] } = props

  return Object.keys(songData).length > 0 && (
    <StyleWrapper className="cpn-song-info">
      <div className="content">
        <div className="left">
          <div className="image">
            <img src={formatUrlWithSize(songData.al.picUrl, 130)} alt="" />
            <span className="cover image_cover"></span>
          </div>
          <div className="link">
            <i className="sprite_icon2"></i>
            <NavLink to={`/outchain/2/${songData.id}`} title="生成外联播放器">生成外联播放器</NavLink>
          </div>
        </div>
        <div className="right">
          <div className="header">
            <i className="sprite_icon2"></i>
            <h3 className="title">{songData.name}</h3>
          </div>
          <div className="singer">
            <span className="label">歌手：</span>
            <ArtistsDivide artists={songData.ar} />
          </div>
          <div className="album">
            <span className="label">所属专辑：</span>
            <NavLink to={`/album?id=${songData.al.id}`}
              title={songData.al.name}
              className="name">
              {songData.al.name}
            </NavLink>
          </div>
          <OperationBar songId={songData.id} />
          <SongLyric songLyric={songLyric} />
        </div>
      </div>
    </StyleWrapper>
  )
})
