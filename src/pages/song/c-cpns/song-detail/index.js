import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import ArtistsDivide from '@/components/artists-divide'
import OperationBar from '@/components/operation-bar'

import SongLyric from '../song-lyric'

import { StyleWrapper } from './style'

export default memo(function SongDetail(props) {

  /**
   * props and state
   */
  const { songData = {}, songLyric = [], commentTotal = 0 } = props

  return Object.keys(songData).length > 0 && (
    <StyleWrapper className="cpn-song-detail">
      <div className="content">
        <div className="left">
          <div className="image">
            <img src={formatUrlWithSize(songData.al.picUrl, 130)} alt="" />
            <span className="cover image_cover"></span>
          </div>
          <div className="link">
            <i className="sprite_icon2"></i>
            <a href={`https://music.163.com/#/outchain/2/${songData.id}`} title="生成外联播放器" target="_blank" rel="noreferrer">生成外联播放器</a>
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
          <OperationBar songId={songData.id} commentText={commentTotal} />
          <SongLyric songLyric={songLyric} />
        </div>
      </div>
    </StyleWrapper>
  )
})
