import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function ListHeader(props) {

  /**
   * props and state
   */
  const { orderConfig, nameConfig, durationConfig, artistConfig, albumConfig } = props

  return (
    <StyledWrapper className="cpn-list-header">
      {
        orderConfig && (
          <div className="cell order">
            <div className="content text-nowrap">
              <span>{orderConfig.text}</span>
            </div>
          </div>
        )
      }
      {
        nameConfig && (
          <div className="cell name">
            <div className="content text-nowrap">
              <span>{nameConfig.text}</span>
            </div>
          </div>
        )
      }
      {
        durationConfig && (
          <div className="cell duration">
            <div className="content text-nowrap">
              <span>{durationConfig.text}</span>
            </div>
          </div>
        )
      }
      {
        artistConfig && (
          <div className="cell artist">
            <div className="content text-nowrap">
              <span>{artistConfig.text}</span>
            </div>
          </div>
        )
      }
      {
        albumConfig && (
          <div className="cell album">
            <div className="content text-nowrap">
              <span>{albumConfig.text}</span>
            </div>
          </div>
        )
      }
    </StyledWrapper>
  )
})
