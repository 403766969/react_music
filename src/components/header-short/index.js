import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import { StyleWrapper } from './style'

const HeaderShortMemo = memo(function HeaderShort(props) {

  /**
   * props and state
   */
  const { title, more } = props

  return (
    <StyleWrapper>
      <h3>{title}</h3>
      {
        more.link && more.text
          ? <NavLink to={more.link}>{more.text} &gt;</NavLink>
          : null
      }
    </StyleWrapper>
  )
})

HeaderShortMemo.defaultProps = {
  title: '',
  more: {}
}

HeaderShortMemo.propTypes = {
  title: PropTypes.string.isRequired,
  more: PropTypes.shape({
    text: PropTypes.string,
    link: PropTypes.string
  })
}

export default HeaderShortMemo
