import React, { memo } from 'react'

import TopBanner from './c-cpns/top-banner'
import HotRecomd from './c-cpns/hot-recomd'
import NewAlbum from './c-cpns/new-album'
import RankMulti from './c-cpns/rank-multi'

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

        </RecomdRight>
      </RecomdContent>
    </RecomdWrapper>
  )
})
