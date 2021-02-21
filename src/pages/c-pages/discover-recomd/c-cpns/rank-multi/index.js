import React, { memo } from 'react'

import HeaderLong from '@/components/header-long'

import RankSimple from './c-cpns/rank-simple'

import { StyledWrapper } from './style'

export default memo(function RankMulti(props) {

  /**
   * props and state
   */
  const { cpnData = [] } = props

  return (
    <StyledWrapper className="cpn-rank-multi">
      <HeaderLong title="榜单" more={{ text: '更多', link: '/discover/toplist' }} />
      <div className="content">
        {
          cpnData.map(item => {
            return <RankSimple key={item.id} cpnData={item} />
          })
        }
      </div>
    </StyledWrapper>
  )
})
