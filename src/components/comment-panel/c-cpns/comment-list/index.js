import React, { memo, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { formatDate } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function CommentList(props) {

  /**
   * props and state
   */
  const { title = '', listData = [] } = props

  /**
   * other logic
   */
  const nowTime = new Date().getTime()
  const limitTime = 7 * 24 * 60 * 60 * 1000

  /**
   * render logic
   */
  function renderContent(content) {
    if (!content) {
      return null
    }
    const rowArr = content.split('\n')
    const rowEls = []

    // 原样输出
    // for (let i = 0; i < rowArr.length; i++) {
    //   const rowItem = rowArr[i]
    //   const rowEl = (
    //     <Fragment key={rowItem + i}>
    //       {rowItem}
    //       <br />
    //     </Fragment>
    //   )
    //   rowEls.push(rowEl)
    // }

    // 匹配"@"
    for (let i = 0; i < rowArr.length; i++) {
      const rowItem = rowArr[i]
      const textArr = rowItem.split(/@[^@\s]+/g)
      const matchArr = []
      rowItem.replace(/@[^@\s]+/g, match => {
        matchArr.push(match.replace(/@/, ''))
      })
      const inlineEls = []
      for (let j = 0; j < textArr.length; j++) {
        const inlineEl = (
          <Fragment key={textArr[j] + j}>
            {textArr[j]}
            {matchArr[j] && (
              <NavLink to={`/user/home?nickname=${matchArr[j]}`}>@{matchArr[j]}</NavLink>
            )}
          </Fragment>
        )
        inlineEls.push(inlineEl)
      }
      const rowEl = (
        <Fragment key={rowItem + i}>
          {inlineEls}
          <br />
        </Fragment>
      )
      rowEls.push(rowEl)
    }

    return rowEls
  }

  return listData.length > 0 && (
    <StyledWrapper className="cpn-comment-list">
      <h3 className="title">{title}</h3>
      <ul className="comment-list">
        {
          listData.map(item => {
            return (
              <li className="comment-item" key={item.commentId}>
                <div className="avater">
                  <NavLink to={`/user/home?id=${item.user.userId}`}>
                    <img src={item.user.avatarUrl} alt="" />
                  </NavLink>
                </div>
                <div className="content">
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
                        renderContent(item.content)
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
                            renderContent(item.beReplied[0].content)
                          }
                        </span>
                      </div>
                    )
                  }
                  <div className="bottom">
                    {
                      (nowTime - item.time) < limitTime
                        ? (
                          <div className="time">{formatDate(item.time, 'MM月dd日 mm:ss')}</div>
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
              </li>
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
