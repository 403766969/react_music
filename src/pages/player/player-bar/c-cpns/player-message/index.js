import React, { memo, useRef } from 'react'

import { StyledWrapper } from './style'

export default memo(function PlayerMessage(props) {

  /**
   * props and state
   */
  const { dispatch, actions, messageConfig } = props

  /**
   * other hooks
   */
  const timer = useRef()

  /**
   * other logic
   */
  if (messageConfig) {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      clearTimeout(timer.current)
      timer.current = null
      dispatch(actions.set_messageConfig(null))
    }, messageConfig.duration || 3000)
  }

  return (
    <StyledWrapper className="cpn-player-message sprite_playbar text-nowrap" style={{ display: messageConfig ? 'block' : 'none' }}>
      <span>{messageConfig && messageConfig.message}</span>
    </StyledWrapper>
  )
})
