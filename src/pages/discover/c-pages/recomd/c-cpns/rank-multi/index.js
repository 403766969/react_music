import React, { memo } from 'react'

import HeaderLong from '@/components/header-long'

import RankSimple from '../rank-simple'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(function RankMulti(props) {

  /**
   * props and state
   */
  const { rankMultiList = [] } = props

  return (
    <StyledWrapper>
      <HeaderLong title="榜单" more={{ text: '更多', link: '/discover/toplist' }} />
      <StyledContent>
        {
          rankMultiList.map(item => {
            return <RankSimple rankSimpleInfo={item} key={item.id} />
          })
        }
      </StyledContent>
    </StyledWrapper>
  )
})
