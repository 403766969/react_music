import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import {
  HeaderRecomdWrapper,
  HeaderRecomdLeft,
  HeaderRecomdRight
} from './style'

const HeaderRecomdMemo = memo(function HeaderRecomd(props) {

  const { title, keywords, more } = props

  return (
    <HeaderRecomdWrapper className="sprite_02">
      <HeaderRecomdLeft>
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
      </HeaderRecomdLeft>
      <HeaderRecomdRight>
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
      </HeaderRecomdRight>
    </HeaderRecomdWrapper>
  )

})

HeaderRecomdMemo.defaultProps = {
  title: '',
  keywords: [],
  more: {}
}

HeaderRecomdMemo.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(
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

export default HeaderRecomdMemo
