import React, { memo } from 'react'

import SongsheetCover from '@/components/songsheet-cover'
import LoadingSpin from '@/components/loading-spin'

import { StyledWrapper } from './style'

export default memo(function SongsheetList(props) {

  /**
   * props and state
   */
  const { songsheetList, isLoading } = props

  return isLoading
    ? (
      <LoadingSpin text="加载中..." />
    )
    : (
      <StyledWrapper className="cpn-songsheet-list">
        {
          songsheetList && songsheetList.map((item, index) => {
            return (
              <li key={item.id + index}>
                <SongsheetCover songsheetInfo={item} creator />
              </li>
            )
          })
        }
      </StyledWrapper >
    )
})
