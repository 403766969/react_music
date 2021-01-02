import React, { memo } from 'react'

import TopBanner from './c-cpns/top-banner'
import HotReco from './c-cpns/hot-reco'

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
          <HotReco />
        </RecomdLeft>
        <RecomdRight>

        </RecomdRight>
      </RecomdContent>
    </RecomdWrapper>
  )
})
