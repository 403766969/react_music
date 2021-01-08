import React, { memo } from 'react'

import { dicoverPartLinks } from '@/services/local-data'

import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { StyledWrapper } from './style'

export default memo(function Discover(props) {
  return (
    <StyledWrapper>
      <div className="partition">
        <ul className="wrap-v1 content">
          {
            dicoverPartLinks.map(item => {
              return (
                <li className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>
      {renderRoutes(props.route.routes)}
    </StyledWrapper>
  )
})
