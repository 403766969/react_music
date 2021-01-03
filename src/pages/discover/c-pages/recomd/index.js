import React, { memo } from 'react'

import TopBanner from './c-cpns/top-banner'
import HotRecomd from './c-cpns/hot-recomd'
import NewAlbum from './c-cpns/new-album'
import RankMulti from './c-cpns/rank-multi'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'

import {
  RecomdWrapper,
  RecomdContent,
  RecomdLeft,
  RecomdRight
} from './style'

export default memo(function Recomd(props) {
  return (
    <RecomdWrapper>
      <TopBanner />
      <RecomdContent className="wrap-v2">
        <RecomdLeft>
          <HotRecomd />
          <NewAlbum />
          <RankMulti />
        </RecomdLeft>
        <RecomdRight>
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </RecomdRight>
      </RecomdContent>
    </RecomdWrapper>
  )
})
