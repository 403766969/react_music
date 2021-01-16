import React, { memo } from 'react'

import PanelHeader from './c-cpns/panel-header'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(function AppPlayerPanel(props) {

  /**
   * props and state
   */
  const { isShowPanel, handleCloseClick } = props

  return (
    <StyledWrapper style={{ display: isShowPanel ? 'block' : 'none' }}>
      <PanelHeader handleCloseClick={handleCloseClick} />
      <StyledContent>

      </StyledContent>
    </StyledWrapper>
  )
})
