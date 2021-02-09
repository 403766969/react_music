import React, { memo } from 'react'

import SongsheetCover from '@/components/songsheet-cover'

import {
  StyledWrapper
} from './style'

export default memo(function SongsheetList(props) {

  /**
   * props and state
   */
  const { listData = [] } = props

  return (
    <StyledWrapper className="cpn-songsheet-list">
      {
        listData.map(item => {
          return (
            <li key={item.id}>
              <SongsheetCover songsheetData={item} isShowAuthor={true} />
            </li>
          )
        })
      }
    </StyledWrapper >
  )
})
