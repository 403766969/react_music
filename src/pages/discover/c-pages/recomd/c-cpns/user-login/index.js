import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function UserLogin() {
  return (
    <StyledWrapper className="cpn-user-login sprite_02">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <span className="sprite_02">用户登录</span>
    </StyledWrapper>
  )
})
