import React, { memo } from 'react'

import SongsheetCover from '@/components/songsheet-cover'

import { StyledWrapper } from './style'

export default memo(function SongsheetList(props) {

  /**
   * props and state
   */
  const { songsheetList } = props

  return (
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