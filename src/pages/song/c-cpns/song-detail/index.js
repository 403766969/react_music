import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import * as playerActions from '@/pages/player/store/actionCreators'

import ArtistDivide from '@/components/artist-divide'
import OperationBar from '@/components/operation-bar'
import LoadingSpin from '@/components/loading-spin'

import SongLyric from '../song-lyric'

import { StyleWrapper } from './style'

export default memo(function SongDetail(props) {

  /**
   * props and state
   */
  const { songDetail, songLyric, commentCount, isLoading } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = useCallback(() => {
    let sourceLink = `/song?id=${songDetail.id}`
    dispatch(playerActions.add_simpleSong_with_songObject(songDetail, sourceLink, true))
  }, [dispatch, songDetail])

  const handleAddClick = useCallback(() => {
    let sourceLink = `/song?id=${songDetail.id}`
    dispatch(playerActions.add_simpleSong_with_songObject(songDetail, sourceLink, false))
  }, [dispatch, songDetail])

  /**
   * render logic
   */
  let tnsAndAlia = ''
  if (songDetail) {
    const tns = songDetail.tns || []
    const alia = songDetail.alia || []
    const temp = [...tns, ...alia]
    tnsAndAlia = temp.join(' / ')
  }

  return isLoading
    ? (
      <LoadingSpin text="加载中" />
    )
    : (songDetail
      ? (
        <StyleWrapper className="cpn-song-detail">
          <div className="content">
            <div className="left">
              <div className="image">
                <img src={formatUrlWithSize(songDetail.al.picUrl, 130)} alt="" />
                <span className="cover image_cover"></span>
              </div>
              <div className="link">
                <i className="sprite_icon2"></i>
                <a href={`https://music.163.com/#/outchain/2/${songDetail.id}`} title="生成外联播放器" target="_blank" rel="noreferrer">生成外联播放器</a>
              </div>
            </div>
            <div className="right">
              <div className="header">
                <i className="sprite_icon2 icon-tag"></i>
                <h3 className="title">
                  <span>{songDetail.name}</span>
                  {
                    songDetail.mv !== 0 && (
                      <NavLink className="song-mv" to={`/mv?id=${songDetail.mv}`} title="播放mv">
                        <i className="sprite_icon2 icon-mv"></i>
                      </NavLink>
                    )
                  }
                </h3>
                {
                  tnsAndAlia !== '' && (
                    <p className="tna">
                      <span>{tnsAndAlia}</span>
                    </p>
                  )
                }
              </div>
              <div className="singer">
                <span className="label">歌手：</span>
                <ArtistDivide artistList={songDetail.ar} divide={' / '} />
              </div>
              <div className="album">
                <span className="label">所属专辑：</span>
                <NavLink to={`/album?id=${songDetail.al.id}`}
                  title={songDetail.al.name}
                  className="name">
                  {songDetail.al.name}
                </NavLink>
              </div>
              <OperationBar commentText={commentCount} onPlayClick={handlePlayClick} onAddClick={handleAddClick} />
              <SongLyric songLyric={songLyric} />
            </div>
          </div>
        </StyleWrapper>
      )
      : null
    )
})
