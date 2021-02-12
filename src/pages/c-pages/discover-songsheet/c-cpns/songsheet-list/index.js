import React, { memo } from 'react'

import SongsheetCover from '@/components/songsheet-cover'

import { StyledWrapper } from './style'

export default memo(function SongsheetList(props) {

  /**
   * props and state
   */
  const { listData = [] } = props

  return (
    <StyledWrapper className="cpn-songsheet-list">
      {
        listData.map((item, index) => {
          return (
            <li key={item.id + index}>
              <SongsheetCover songsheetData={item} isShowAuthor={true} />
            </li>
          )
        })
      }
    </StyledWrapper >
  )
})
