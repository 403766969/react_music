import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { HotAnchor_Links } from '@/services/local-data'

import HeaderShort from '@/components/header-short'

import { StyledWrapper } from './style'

export default memo(function HotAnchor() {
  return (
    <StyledWrapper className="cpn-hot-anchor">
      <HeaderShort title={'热门主播'} />
      <div className="content">
        {
          HotAnchor_Links.map(item => {
            return (
              <div className="item" key={item.id}>
                <NavLink to={item.url} className="image">
                  <img src={item.picUrl} alt="" />
                </NavLink>
                <div className="info">
                  <NavLink to={item.url} className="name">{item.name}</NavLink>
                  <div className="position text-nowrap">{item.position}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </StyledWrapper>
  )
})
