import React, { memo, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { formatDate } from '@/utils/formatter'
import { matchText, wrapMatcher, atMatcher, emojiMatcher } from '@/utils/parser'

import { StyledWrapper } from './style'

export default memo(function CommentList(props) {

  /**
   * props and state
   */
  const { cpnData = {} } = props

  /**
   * render logic
   */
  const nowTime = new Date().getTime()
  const limitTime = 7 * 24 * 60 * 60 * 1000

  return Object.keys(cpnData).length > 0 && (
    <StyledWrapper className="cpn-list-item">
      <div className="avater">
        <NavLink to={`/user/home?id=${cpnData.user.userId}`}>
          <img src={cpnData.user.avatarUrl} alt="" />
        </NavLink>
      </div>
      <div className="main">
        <div className="top">
          <NavLink className="user" to={`/user/home?id=${cpnData.user.userId}`}>{cpnData.user.nickname}</NavLink>
          {
            cpnData.user.vipRights && cpnData.user.vipRights.redVipLevel >= 1 && cpnData.user.vipRights.redVipLevel <= 7 && (
              <i className={`vip vip-${cpnData.user.vipRights.redVipLevel}`}></i>
            )
          }
          <span className="text">
            ：
            {
              matchText(cpnData.content, wrapMatcher, atMatcher, emojiMatcher).map((itemX, indeX) => {
                return (
                  <Fragment key={indeX}>{itemX}</Fragment>
                )
              })
            }
          </span>
        </div>
        {
          cpnData.beReplied && cpnData.beReplied[0] && (
            <div className="mid">
              <NavLink className="user" to={`/user/home?id=${cpnData.beReplied[0].user.userId}`}>{cpnData.beReplied[0].user.nickname}</NavLink>
              <span className="text">
                ：
                {
                  matchText(cpnData.beReplied[0].content, wrapMatcher, atMatcher, emojiMatcher).map((itemY, indeY) => {
                    return (
                      <Fragment key={indeY}>{itemY}</Fragment>
                    )
                  })
                }
              </span>
            </div>
          )
        }
        <div className="bottom">
          {
            (nowTime - cpnData.time) < limitTime
              ? (
                <div className="time">{formatDate(cpnData.time, 'MM月dd日 hh:mm')}</div>
              )
              : (
                <div className="time">{formatDate(cpnData.time, 'yyyy年MM月dd日')}</div>
              )
          }
          <div className="operation">
            <span className="like">
              <i className="sprite_icon3 like-icon"></i>
              ({cpnData.likedCount})
            </span>
            <span className="divide">|</span>
            <span className="reply">回复</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
})
