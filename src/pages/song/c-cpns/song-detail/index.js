import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import * as playerActions from '@/pages/player/store/acitonCreators'

import ArtistsDivide from '@/components/artists-divide'
import OperationBar from '@/components/operation-bar'

import SongLyric from '../song-lyric'

import { StyleWrapper } from './style'

export default memo(function SongDetail(props) {

  /**
   * props and state
   */
  const { cpnData = {} } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = useCallback(() => {
    if (cpnData.songDetail && cpnData.songDetail.id) {
      dispatch(playerActions.add_simpleSong(cpnData.songDetail.id, true))
    }
  }, [dispatch, cpnData])

  const handleAddClick = useCallback(() => {
    if (cpnData.songDetail && cpnData.songDetail.id) {
      dispatch(playerActions.add_simpleSong(cpnData.songDetail.id, false))
    }
  }, [dispatch, cpnData])

  return Object.keys(cpnData.songDetail).length > 0 && (
    <StyleWrapper className="cpn-song-detail">
      <div className="content">
        <div className="left">
          <div className="image">
            <img src={formatUrlWithSize(cpnData.songDetail.al.picUrl, 130)} alt="" />
            <span className="cover image_cover"></span>
          </div>
          <div className="link">
            <i className="sprite_icon2"></i>
            <a href={`https://music.163.com/#/outchain/2/${cpnData.songDetail.id}`} title="生成外联播放器" target="_blank" rel="noreferrer">生成外联播放器</a>
          </div>
        </div>
        <div className="right">
          <div className="header">
            <i className="sprite_icon2"></i>
            <h3 className="title">{cpnData.songDetail.name}</h3>
          </div>
          <div className="singer">
            <span className="label">歌手：</span>
            <ArtistsDivide cpnData={cpnData.songDetail.ar} divide={' / '} />
          </div>
          <div className="album">
            <span className="label">所属专辑：</span>
            <NavLink to={`/album?id=${cpnData.songDetail.al.id}`}
              title={cpnData.songDetail.al.name}
              className="name">
              {cpnData.songDetail.al.name}
            </NavLink>
          </div>
          <OperationBar commentText={cpnData.commentTotal} onPlayClick={handlePlayClick} onAddClick={handleAddClick} />
          <SongLyric cpnData={cpnData.songLyric} />
        </div>
      </div>
    </StyleWrapper>
  )
})
