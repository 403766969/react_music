import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { StyledWrapper } from './style'

const HeaderLongMemo = memo(function HeaderLong(props) {

  /**
   * props and state
   */
  const { title, links, more } = props

  return (
    <StyledWrapper className="cpn-header-long sprite_02">
      <div className="left">
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
      </div>
      <div className="right">
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
      </div>
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
