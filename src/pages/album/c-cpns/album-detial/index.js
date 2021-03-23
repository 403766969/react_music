import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { formatUrlWithSize, formatDate, formatCount } from '@/utils/formatter'

import * as playerActions from '@/pages/player/store/actionCreators'

import ArtistDivide from '@/components/artist-divide'
import OperationBar from '@/components/operation-bar'
import LoadingSpin from '@/components/loading-spin'

import { StyledWrapper } from './style'

export default memo(function AlbumDetail(props) {

  /**
   * props and state
   */
  const { albumDetail, commentCount, songList, sourceLink, isLoading } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = useCallback(() => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, sourceLink, true))
    }
  }, [dispatch, songList, sourceLink])

  const handleAddClick = useCallback(() => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, sourceLink, false))
    }
  }, [dispatch, songList, sourceLink])

  return isLoading
    ? (
      < LoadingSpin text="加载中..." />
    )
    : (albumDetail
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
              <ArtistDivide artistList={albumDetail.artists} divide={' / '} />
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
    )
})
