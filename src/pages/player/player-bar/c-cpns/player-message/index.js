import React, { memo, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from '../../../store/actionCreators'

import { StyledWrapper } from './style'

export default memo(function PlayerMessage() {

  /**
   * redux hooks
   */
  const {
    r_messageConfig
  } = useSelector(state => ({
    r_messageConfig: state.getIn(['player', 'messageConfig'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const timer = useRef()

  /**
   * other logic
   */
  if (r_messageConfig) {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      clearTimeout(timer.current)
      timer.current = null
      dispatch(actions.set_messageConfig(null))
    }, r_messageConfig.duration || 3000)
  }

  return (
    <StyledWrapper className="cpn-player-message sprite_playbar text-nowrap" style={{ display: r_messageConfig ? 'block' : 'none' }}>
      <span>{r_messageConfig && r_messageConfig.message}</span>
    </StyledWrapper>
  )
})
