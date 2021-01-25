import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import {
  StyledWrapper,
  StyledLeft,
  StyledRight
} from './style'

const HeaderLongMemo = memo(function HeaderLong(props) {

  /**
   * props and state
   */
  const { title, links, more } = props

  return (
    <StyledWrapper className="sprite_02">
      <StyledLeft>
        <h3 className="title">{title}</h3>
        <ul className="keyword">
          {
            links.map(item => {
              return (
                <li className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                  <span className="divider">|</span>
                </li>
              )
            })
          }
        </ul>
      </StyledLeft>
      <StyledRight>
        {
          more.link && more.text
            ? <NavLink to={more.link}>{more.text}</NavLink>
            : null
        }
        {
          more.link && more.text
            ? <i className="icon sprite_02"></i>
            : null
        }
      </StyledRight>
    </StyledWrapper>
  )

})

HeaderLongMemo.defaultProps = {
  title: '',
  links: [],
  more: {}
}

HeaderLongMemo.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  ),
  more: PropTypes.shape({
    text: PropTypes.string,
    link: PropTypes.string
  })
}

export default HeaderLongMemo
