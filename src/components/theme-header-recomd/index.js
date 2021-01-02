import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import {
  ThemeHeaderWrapper,
  ThemeHeaderLeft,
  ThemeHeaderRight
} from './style'

const ThemeHeaderRecomdMemo = memo(function ThemeHeaderRecomd(props) {

  const { title, keywords, more } = props

  return (
    <ThemeHeaderWrapper className="sprite_02">
      <ThemeHeaderLeft>
        <h3 className="title">{title}</h3>
        <ul className="keyword">
          {
            keywords.map(item => {
              return (
                <li className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                  <span className="divider">|</span>
                </li>
              )
            })
          }
        </ul>
      </ThemeHeaderLeft>
      <ThemeHeaderRight>
        <NavLink to={more.link}>{more.title}</NavLink>
        <i className="icon sprite_02"></i>
      </ThemeHeaderRight>
    </ThemeHeaderWrapper>
  )

})

ThemeHeaderRecomdMemo.defaultProps = {
  title: '标题',
  keywords: [],
  more: {
    title: '更多',
    link: '/'
  }
}

ThemeHeaderRecomdMemo.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  ),
  more: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  })
}

export default ThemeHeaderRecomdMemo
