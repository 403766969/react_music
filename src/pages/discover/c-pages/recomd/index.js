import React, { memo } from 'react'

import TopBanner from './c-cpns/top-banner'
import HotRecomd from './c-cpns/hot-recomd'
import NewAlbum from './c-cpns/new-album'
import RankMulti from './c-cpns/rank-multi'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'

import {
  StyledWrapper,
  StyledContent,
  StyledLeft,
  StyledRight
} from './style'

export default memo(function Recomd(props) {
  return (
    <StyledWrapper>
      <TopBanner />
      <StyledContent className="wrap-v2">
        <StyledLeft>
          <HotRecomd />
          <NewAlbum />
          <RankMulti />
        </StyledLeft>
        <StyledRight>
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </StyledRight>
      </StyledContent>
    </StyledWrapper>
  )
})
