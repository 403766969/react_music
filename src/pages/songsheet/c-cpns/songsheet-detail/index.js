import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate, formatCount } from '@/utils/formatter'

import * as playerActions from '@/pages/player/store/acitonCreators'

import OperationBar from '@/components/operation-bar'

import SongsheetIntro from '../songsheet-intro'

import { StyledWrapper } from './style'

export default memo(function SongsheetDetail(props) {

  /**
   * props and state
   */
  const { cpnData } = props

  const { detail, songList } = cpnData

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const songsheetIntroData = {
    tags: detail.tags || [],
    description: detail.description || ''
  }

  const handlePlayClick = useCallback(() => {
    dispatch(playerActions.add_multipleSong_with_songList(songList, true))
  }, [dispatch, songList])

  const handleAddClick = useCallback(() => {
    dispatch(playerActions.add_multipleSong_with_songList(songList, false))
  }, [dispatch, songList])

  return Object.keys(detail).length > 0 && (
    <StyledWrapper className="cpn-songsheet-detail">
      <div className="cover">
        <img src={formatUrlWithSize(detail.coverImgUrl, 200)} alt="" />
        <span className="image_cover mask"></span>
      </div>
      <div className="info">
        <div className="header">
          <i className="sprite_icon2"></i>
          <h2 className="title">{detail.name}</h2>
        </div>
        <div className="creator">
          <NavLink to={`/user/home?id=${detail.creator.userId}`}>
            <img className="avatar" src={formatUrlWithSize(detail.creator.avatarUrl, 35)} alt="" />
          </NavLink>
          <NavLink className="nickname" to={`/user/home?id=${detail.creator.userId}`}>{detail.creator.nickname}</NavLink>
          {
            detail.creator.avatarDetail && (
              <img className="icon" src={detail.creator.avatarDetail.identityIconUrl} alt="" />
            )
          }
          <span className="time">{formatDate(detail.createTime, 'yyyy-MM-dd')}&nbsp;创建</span>
        </div>
        <OperationBar
          favorText={formatCount(detail.subscribedCount, true)}
          shareText={detail.shareCount}
          commentText={detail.commentCount}
          onPlayClick={handlePlayClick}
          onAddClick={handleAddClick} />
        <SongsheetIntro cpnData={songsheetIntroData} />
      </div>
    </StyledWrapper>
  )
})
