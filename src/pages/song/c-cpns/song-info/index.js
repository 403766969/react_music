import React, { memo } from 'react'

import { formatUrlWithSize } from '@/utils/formatter'

import { NavLink } from 'react-router-dom'

import ArtistsDivide from '@/components/artists-divide'

import OperationBar from './c-cpns/operation-bar'
import SongLyric from './c-cpns/song-lyric'

import {
  StyleWrapper,
  StyleContent,
  StyleLeft,
  StyleRight
} from './style'

export default memo(function SongInfo(props) {

  /**
   * props and state
   */
  const { songInfo = {}, songLyric = [] } = props

  return (
    <StyleWrapper>
      {
        Object.keys(songInfo).length > 0
        &&
        <StyleContent>
          <StyleLeft>
            <div className="image">
              <img src={formatUrlWithSize(songInfo.al.picUrl, 130)} alt="" />
              <span className="cover image_cover"></span>
            </div>
            <div className="link">
              <i className="sprite_icon2"></i>
              <NavLink to={`/outchain/2/${songInfo.id}`} title="生成外联播放器">生成外联播放器</NavLink>
            </div>
          </StyleLeft>
          <StyleRight>
            <div className="header">
              <i className="sprite_icon2"></i>
              <h3 className="title">{songInfo.name}</h3>
            </div>
            <div className="singer">
              <span className="label">歌手：</span>
              <ArtistsDivide artists={songInfo.ar} />
            </div>
            <div className="album">
              <span className="label">所属专辑：</span>
              <NavLink to={`/album?id=${songInfo.al.id}`}
                title={songInfo.al.name}
                className="name">
                {songInfo.al.name}
              </NavLink>
            </div>
            <OperationBar songId={songInfo.id} />
            <SongLyric songLyric={songLyric} />
          </StyleRight>
        </StyleContent>
      }
    </StyleWrapper>
  )
})
