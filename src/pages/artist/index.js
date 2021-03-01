import React, { memo } from 'react'

import ChannelBar from '@/components/channel-bar'

import { StyledWrapper } from './style'

export default memo(function Artist() {
  return (
    <StyledWrapper className="page-artist">
      <ChannelBar />
      <div className="content wrap-v3">
        <div className="left">

        </div>
        <div className="right">

        </div>
      </div>
    </StyledWrapper>
  )
})
