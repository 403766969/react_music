import React, { memo } from 'react'

import HeaderLong from '@/components/header-long'
import LoadingSpin from '@/components/loading-spin'

import RankSimple from './c-cpns/rank-simple'

import { StyledWrapper } from './style'

export default memo(function RankMulti(props) {

  /**
   * props and state
   */
  const { rankList, isLoading } = props

  return (
    <StyledWrapper className="cpn-rank-multi">
      <HeaderLong title="榜单" more={{ text: '更多', link: '/discover/toplist' }} />
      {
        isLoading && (
          <LoadingSpin text="加载中..." />
        )
      }
      {
        !isLoading && rankList && rankList.length > 0 && (
          <div className="content">
            {
              rankList.map(item => {
                return <RankSimple key={item.id} rankInfo={item} />
              })
            }
          </div>
        )
      }
    </StyledWrapper>
  )
})
