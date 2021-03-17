import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function Friend() {
  return (
    <StyledWrapper className="page-friend wrap-v3">
      <div className="bg">
        <p className="text">
          你可以关注明星和好友品味他们的私房歌单
          <br />
          通过他们的动态发现更多精彩音乐
        </p>
        <span className="login" title="登录">登录</span>
      </div>
    </StyledWrapper>
  )
})
