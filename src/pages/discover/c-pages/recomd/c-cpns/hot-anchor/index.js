import React, { memo } from 'react'

import { hotAnchorLinks } from '@/services/local-data'

import { NavLink } from 'react-router-dom'

import HeaderSmall from '@/components/header-small'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(function HotAnchor() {
  return (
    <StyledWrapper>
      <HeaderSmall title={'热门主播'} />
      <StyledContent>
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
      </StyledContent>
    </StyledWrapper>
  )
})
