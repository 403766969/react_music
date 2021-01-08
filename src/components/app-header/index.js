import React, { memo } from 'react'

import { appheaderLinks } from '@/services/local-data'

import { NavLink } from 'react-router-dom'

import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import {
  StyledWrapper,
  StyledLeft,
  StyledRight
} from './style'

export default memo(function AppHeader() {
  return (
    <StyledWrapper>
      <div className="wrap-v1 content">
        <StyledLeft>
          <h1 className="logo sprite_01">
            <NavLink to="/">网易云音乐</NavLink>
          </h1>
          <ul className="channel-menu">
            {
              appheaderLinks.map(item => {
                return (
                  <li className="channel-item" key={item.title}>
                    {
                      item.isNav
                        ? <NavLink to={item.link}>{item.title}</NavLink>
                        : <a href={item.link} target="_blank" rel="noreferrer">{item.title}</a>
                    }
                  </li>
                )
              })
            }
          </ul>
        </StyledLeft>
        <StyledRight>
          <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
          <div className="creator-center">
            <NavLink to="/">创作者中心</NavLink>
          </div>
          <div className="login">
            <NavLink to="/">登录</NavLink>
          </div>
        </StyledRight>
      </div>
      <div className="divider"></div>
    </StyledWrapper>
  )
})
