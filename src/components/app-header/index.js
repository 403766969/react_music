import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { AppHeader_Links } from '@/services/local-data'

import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { StyledWrapper } from './style'

export default memo(function AppHeader() {
  return (
    <StyledWrapper className="cpn-app-header wrap-min-width">
      <div className="wrap-v1 content">
        <div className="left">
          <h1 className="logo sprite_01">
            <NavLink to="/">网易云音乐</NavLink>
          </h1>
          <ul className="channel-menu">
            {
              AppHeader_Links.map(item => {
                return (
                  <li className="channel-item" key={item.title}>
                    {
                      item.isInside
                        ? <NavLink to={item.link}>{item.title}</NavLink>
                        : <a href={item.link} target="_blank" rel="noreferrer">{item.title}</a>
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="right">
          <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
          <div className="creator-center">
            <span to="/">创作者中心</span>
          </div>
          <div className="login">
            <span to="/">登录</span>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </StyledWrapper>
  )
})
