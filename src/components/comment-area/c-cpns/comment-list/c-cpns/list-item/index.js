import React, { memo, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { formatDate } from '@/utils/formatter'
import { matchText, wrapMatcher, atMatcher, emojiMatcher } from '@/utils/parser'

import { StyledWrapper } from './style'

export default memo(function CommentList(props) {

  /**
   * props and state
   */
  const { item } = props

  /**
   * render logic
   */
  const nowTime = new Date().getTime()
  const limitTime = 7 * 24 * 60 * 60 * 1000

  return (
    <StyledWrapper className="cpn-list-item">
      <div className="avater">
        <NavLink to={`/user/home?id=${item.user.userId}`}>
          <img src={item.user.avatarUrl} alt="" />
        </NavLink>
      </div>
      <div className="main">
        <div className="top">
          <NavLink className="user" to={`/user/home?id=${item.user.userId}`}>{item.user.nickname}</NavLink>
          {
            item.user.vipRights && item.user.vipRights.redVipLevel >= 1 && item.user.vipRights.redVipLevel <= 7 && (
              <i className={`vip vip-${item.user.vipRights.redVipLevel}`}></i>
            )
          }
          <span className="text">
            ：
            {
              matchText(item.content, wrapMatcher, atMatcher, emojiMatcher).map((itemX, indeX) => {
                return (
                  <Fragment key={indeX}>{itemX}</Fragment>
                )
              })
            }
          </span>
        </div>
        {
          item.beReplied && item.beReplied[0] && (
            <div className="mid">
              <NavLink className="user" to={`/user/home?id=${item.beReplied[0].user.userId}`}>{item.beReplied[0].user.nickname}</NavLink>
              <span className="text">
                ：
                {
                  matchText(item.beReplied[0].content, wrapMatcher, atMatcher, emojiMatcher).map((itemY, indeY) => {
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
            (nowTime - item.time) < limitTime
              ? (
                <div className="time">{formatDate(item.time, 'MM月dd日 hh:mm')}</div>
              )
              : (
                <div className="time">{formatDate(item.time, 'yyyy年MM月dd日')}</div>
              )
          }
          <div className="operation">
            <span className="like">
              <i className="sprite_icon3 like-icon"></i>
              ({item.likedCount})
            </span>
            <span className="divide">|</span>
            <span className="reply">回复</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
})
