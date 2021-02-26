import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { ChannelBar_Links } from '@/services/local-data'

import { StyledWrapper } from './style'

export default memo(function ChannelBar() {
  return (
    <StyledWrapper className="cpn-channel-bar">
      <div className="wrapper">
        <ul className="wrap-v1 content">
          {
            ChannelBar_Links && ChannelBar_Links.map(item => {
              return (
                <li className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>
    </StyledWrapper>
  )
})
