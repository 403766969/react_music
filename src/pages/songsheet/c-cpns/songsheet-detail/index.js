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
  const { cpnData = {} } = props

  /**
   * other logic
   */
  const songsheetIntroData = {
    tags: cpnData.tags || [],
    description: cpnData.description || ''
  }

  return Object.keys(cpnData).length > 0 && (
    <StyledWrapper className="cpn-songsheet-detail">
      <div className="cover">
        <img src={formatUrlWithSize(cpnData.coverImgUrl, 200)} alt="" />
        <span className="image_cover mask"></span>
      </div>
      <div className="info">
        <div className="header">
          <i className="sprite_icon2"></i>
          <h2 className="title">{cpnData.name}</h2>
        </div>
        <div className="creator">
          <NavLink to={`/user/home?id=${cpnData.creator.userId}`}>
            <img className="avatar" src={formatUrlWithSize(cpnData.creator.avatarUrl, 35)} alt="" />
          </NavLink>
          <NavLink className="nickname" to={`/user/home?id=${cpnData.creator.userId}`}>{cpnData.creator.nickname}</NavLink>
          {
            cpnData.creator.avatarDetail && (
              <img className="icon" src={cpnData.creator.avatarDetail.identityIconUrl} alt="" />
            )
          }
          <span className="time">{formatDate(cpnData.createTime, 'yyyy-MM-dd')}&nbsp;创建</span>
        </div>
        <OperationBar
          songsheetId={cpnData.id}
          favorText={formatCount(cpnData.subscribedCount, true)}
          shareText={cpnData.shareCount}
          commentText={cpnData.commentCount} />
        <SongsheetIntro cpnData={songsheetIntroData} />
      </div>
    </StyledWrapper>
  )
})
