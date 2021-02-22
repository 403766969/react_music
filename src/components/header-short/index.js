import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { StyleWrapper } from './style'

export default memo(function HeaderShort(props) {

  /**
   * props and state
   */
  const { title = '', more = {} } = props

  return (
    <StyleWrapper className="cpn-header-short">
      <h3>{title}</h3>
      {
        more.link && more.text && (
          <NavLink to={more.link}>{more.text} &gt;</NavLink>
        )
      }
    </StyleWrapper>
  )
})
