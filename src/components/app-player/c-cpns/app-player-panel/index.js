import React, { memo } from 'react'

import ScrollPanel from '@/components/scroll-panel'

import PanelHeader from './c-cpns/panel-header'
import PanelPlaylist from './c-cpns/panel-playlist'

import {
  StyledWrapper,
  StyledContent,
  StyledLeft,
  StyledRight
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
        <StyledLeft>
          <ScrollPanel>
            <PanelPlaylist />
          </ScrollPanel>
        </StyledLeft>
        <StyledRight>

        </StyledRight>
      </StyledContent>
    </StyledWrapper>
  )
})
