import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { StyledWrapper } from './style'

export default memo(function CateList(props) {

  /**
   * props and state
   */
  const { cateList, category } = props

  return (
    <StyledWrapper className="cpn-cate-list">
      {
        cateList && cateList.map(item => {
          return (
            <li className={`item ${item.id === category ? 'active' : ''}`} key={item.id}>
              <NavLink className="link" to={`/discover/djradio?category=${item.id}`}>
                <div className="icon" style={{ backgroundImage: `url(${item.picWebUrl})` }}></div>
                <span className="text">{item.name}</span>
              </NavLink>
            </li>
          )
        })
      }
      <li className="item faq">
        <a className="link" href="https://music.163.com/#/topic?id=18652232" target="_blank" rel="noreferrer">
          <div className="icon"></div>
          <span className="text">常见问题</span>
        </a>
      </li>
      <li className="item apply">
        <div className="link">
          <div className="icon"></div>
          <span className="text">我要做主播</span>
        </div>
      </li>
    </StyledWrapper>
  )
})
