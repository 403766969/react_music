import React, { memo } from 'react'

import HeaderLong from '@/components/header-long'

import RankSimple from '../rank-simple'

import { StyledWrapper } from './style'

export default memo(function RankMulti(props) {

  /**
   * props and state
   */
  const { rankMultiList = [] } = props

  return (
    <StyledWrapper className="cpn-rank-multi">
      <HeaderLong title="榜单" more={{ text: '更多', link: '/discover/toplist' }} />
      <div className="content">
        {
          rankMultiList.map(item => {
            return <RankSimple key={item.id} rankSimpleData={item} />
          })
        }
      </div>
    </StyledWrapper>
  )
})
