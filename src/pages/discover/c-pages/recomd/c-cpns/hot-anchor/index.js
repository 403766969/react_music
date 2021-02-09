import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { hotAnchorLinks } from '@/services/local-data'

import HeaderShort from '@/components/header-short'

import { StyledWrapper } from './style'

export default memo(function HotAnchor() {
  return (
    <StyledWrapper className="cpn-hot-anchor">
      <HeaderShort title={'热门主播'} />
      <div className="content">
        {
          hotAnchorLinks.map(item => {
            return (
              <div className="item" key={item.id}>
                <NavLink to={`/user/home?id=${item.id}`} className="image">
                  <img src={item.picUrl} alt="" />
                </NavLink>
                <div className="info">
                  <NavLink to={`/user/home?id=${item.id}`} className="name">{item.name}</NavLink>
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
