import React, { memo } from 'react'

import { hotRecomdLinks } from '@/services/local-data'

import HeaderLong from '@/components/header-long'
import SongsheetCover from '@/components/songsheet-cover'

import { StyledWrapper } from './style'

export default memo(function HotRecomd(props) {

  /**
   * props and state
   */
  const { hotRecomdList = [] } = props

  return (
    <StyledWrapper className="cpn-hot-recomd">
      <HeaderLong title="热门推荐" links={hotRecomdLinks} more={{ text: '更多', link: '/discover/songsheet' }} />
      <ul className="content">
        {
          hotRecomdList.map(item => {
            return (
              <li key={item.id}>
                <SongsheetCover songsheetData={item} />
              </li>
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
