import React, { memo } from 'react'

import TopBanner from './c-cpns/top-banner'

import { RecommendationWrapper } from './style'

export default memo(function Recommendation(props) {
  return (
    <RecommendationWrapper>
      <TopBanner />
    </RecommendationWrapper>
  )
})
