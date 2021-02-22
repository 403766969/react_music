import React, { memo } from 'react'

import SongsheetCover from '@/components/songsheet-cover'

import { StyledWrapper } from './style'

export default memo(function SongsheetList(props) {

  /**
   * props and state
   */
  const { cpnData = [] } = props

  return (
    <StyledWrapper className="cpn-songsheet-list">
      {
        cpnData.map(item => {
          return (
            <li key={item.id}>
              <SongsheetCover cpnData={item} author />
            </li>
          )
        })
      }
    </StyledWrapper >
  )
})
