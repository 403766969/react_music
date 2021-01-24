import React, { memo } from 'react'

import HeaderRecomd from '@/components/header-recomd'
import RankSimple from '@/components/rank-simple'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(function RankMulti(props) {

  /**
   * props and state
   */
  const { rankMultiUp = [], rankMultiNew = [], rankMultiOrg = [] } = props

  return (
    <StyledWrapper>
      <HeaderRecomd title="榜单" more={{ text: '更多', link: '/discover/toplist' }} />
      <StyledContent>
        <RankSimple rankSimpleInfo={rankMultiUp} />
        <RankSimple rankSimpleInfo={rankMultiNew} />
        <RankSimple rankSimpleInfo={rankMultiOrg} />
      </StyledContent>
    </StyledWrapper>
  )
})
