import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate, formatCount } from '@/utils/formatter'

import * as playerActions from '@/pages/player/store/actionCreators'

import OperationBar from '@/components/operation-bar'

import { StyledWrapper } from './style'

export default memo(function AlbumDetail(props) {

  /**
   * props and state
   */
  const { albumDetail, commentCount, songList } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = useCallback(() => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, true))
    }
  }, [dispatch, songList])

  const handleAddClick = useCallback(() => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, false))
    }
  }, [dispatch, songList])

  return albumDetail
    ? (
      <StyledWrapper className="cpn-album-detail">
        <div className="left">
          <div className="cover">
            <img src={formatUrlWithSize(albumDetail.picUrl, 177, 177, 'y')} alt="" />
            <span className="image_cover mask"></span>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <i className="sprite_icon2 icon-tag"></i>
            <h2 className="title">{albumDetail.name}</h2>
            {
              albumDetail.alias && (
                <p className="alias">{albumDetail.alias.join(' / ')}</p>
              )
            }
          </div>
          <div className="artist info">
            <span className="label">歌手：</span>
            <NavLink className="link" to={`/artist?id=${albumDetail.artist.id}`}>{albumDetail.artist.name}</NavLink>
          </div>
          <div className="time info">
            <span className="label">发行时间：{formatDate(albumDetail.publishTime, 'yyyy-MM-dd')}</span>
          </div>
          <div className="company info">
            <span className="label">发行公司：{albumDetail.company}</span>
          </div>
          <div className="opertaion">
            <OperationBar
              commentText={formatCount(commentCount)}
              onPlayClick={handlePlayClick}
              onAddClick={handleAddClick} />
          </div>
        </div>
      </StyledWrapper>
    )
    : null
})
