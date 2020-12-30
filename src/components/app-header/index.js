import React, { memo } from 'react'

import { headNavLinks } from '@/services/local-data'

import { NavLink } from 'react-router-dom'

import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import {
  AppHeaderWrapper,
  HeaderLeft,
  HeaderRight
} from './style'

const showItem = item => (
  <li className="channel-item" key={item.title}>
    {
      item.isNav
        ? <NavLink to={item.link}>{item.title}</NavLink>
        : <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
    }
  </li>
)

export default memo(function AppHeader() {
  return (
    <AppHeaderWrapper>
      <div className="wrap-v1 content">
        <HeaderLeft>
          <h1 className="logo sprite_01">
            <NavLink to="/">网易云音乐</NavLink>
          </h1>
          <ul className="channel-menu">
            {
              headNavLinks.map(item => showItem(item))
            }
          </ul>
        </HeaderLeft>
        <HeaderRight>
          <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
          <div className="creator-center">
            <a href="#/">创作者中心</a>
          </div>
          <div className="login">
            <a href="#/">登录</a>
          </div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </AppHeaderWrapper>
  )
})
