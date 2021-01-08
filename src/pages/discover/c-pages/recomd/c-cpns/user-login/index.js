import React, { memo } from 'react'

import { NavLink } from 'react-router-dom'

import { StyledWrapper } from './style'

export default memo(function UserLogin() {
  return (
    <StyledWrapper className="sprite_02">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <NavLink to="/" className="sprite_02">用户登录</NavLink>
    </StyledWrapper>
  )
})
