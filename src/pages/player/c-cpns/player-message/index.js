import React, { memo, useEffect, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from '../../store/acitonCreators'

import { StyledWrapper } from './style'

export default memo(function PlayerMessage() {

  /**
   * redux hooks
   */
  const r_messageConfig = useSelector(state => state.getIn(['player', 'messageConfig']), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const timer = useRef()

  useEffect(() => {
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
  }, [dispatch, r_messageConfig])

  return (
    <StyledWrapper className="cpn-player-message sprite_playbar text-nowrap" style={{ display: r_messageConfig ? 'block' : 'none' }}>
      {r_messageConfig && r_messageConfig.message}
    </StyledWrapper>
  )
})
