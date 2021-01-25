import React, { memo } from 'react'

import { hotRecomdLinks } from '@/services/local-data'

import HeaderLong from '@/components/header-long'
import SongsheetCover from '@/components/songsheet-cover'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(function HotRecomd(props) {

  /**
   * props and state
   */
  const { hotRecomdList = [] } = props

  return (
    <StyledWrapper>
      <HeaderLong title="热门推荐" links={hotRecomdLinks} more={{ text: '更多', link: '/discover/songsheet' }} />
      <StyledContent>
        {
          hotRecomdList.map(item => {
            return (
              <SongsheetCover songsheetInfo={item} key={item.id} />
            )
          })
        }
      </StyledContent>
    </StyledWrapper>
  )
})
