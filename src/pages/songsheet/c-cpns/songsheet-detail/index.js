import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate, formatCount } from '@/utils/formatter'

import OperationBar from '@/components/operation-bar'

import SongsheetIntro from '../songsheet-intro'

import { StyledWrapper } from './style'

export default memo(function SongsheetDetail(props) {

  /**
   * props and state
   */
  const { songsheetData = {} } = props

  return Object.keys(songsheetData).length > 0 && (
    <StyledWrapper className="cpn-songsheet-detail">
      <div className="cover">
        <img src={formatUrlWithSize(songsheetData.coverImgUrl, 200)} alt="" />
        <span className="image_cover mask"></span>
      </div>
      <div className="info">
        <div className="header">
          <i className="sprite_icon2"></i>
          <h2 className="title">{songsheetData.name}</h2>
        </div>
        <div className="creator">
          <NavLink to={`/user/home?id=${songsheetData.creator.userId}`}>
            <img className="avatar" src={formatUrlWithSize(songsheetData.creator.avatarUrl, 35)} alt="" />
          </NavLink>
          <NavLink className="nickname" to={`/user/home?id=${songsheetData.creator.userId}`}>{songsheetData.creator.nickname}</NavLink>
          {
            songsheetData.creator.avatarDetail && (
              <img className="icon" src={songsheetData.creator.avatarDetail.identityIconUrl} alt="" />
            )
          }
          <span className="time">{formatDate(songsheetData.createTime, 'yyyy-MM-dd')}&nbsp;创建</span>
        </div>
        <OperationBar
          songsheetId={songsheetData.id}
          favorText={formatCount(songsheetData.subscribedCount, true)}
          shareText={songsheetData.shareCount}
          commentText={songsheetData.commentCount} />
        <SongsheetIntro tags={songsheetData.tags} description={songsheetData.description} />
      </div>
    </StyledWrapper>
  )
})
