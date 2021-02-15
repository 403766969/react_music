import React, { memo, useState, useRef, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import { StyledWrapper } from './style'

export default memo(function PlayerMessage() {

  /**
   * props and state
   */
  const [isShow, setIsShow] = useState(false)

  /**
 * redux hooks
 */
  const {
    r_playerStatus
  } = useSelector(state => ({
    r_playerStatus: state.getIn(['player', 'playerStatus'])
  }), shallowEqual)

  /**
   * other hooks
   */
  const timeRef = useRef(null)

  useEffect(() => {
    if (r_playerStatus !== '') {
      setIsShow(true)
      if (timeRef.current) {
        clearTimeout(timeRef.current)
      }
      timeRef.current = setTimeout(() => {
        setIsShow(false)
      }, 3000)
    }
  }, [r_playerStatus])

  return (
    <StyledWrapper className="cpn-player-message sprite_playbar text-nowrap" style={{ display: isShow ? 'block' : 'none' }}>
      {r_playerStatus}
    </StyledWrapper>
  )
})
