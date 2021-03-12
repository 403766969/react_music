import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatCount } from '@/utils/formatter'

import HeaderShort from '@/components/header-short'

import { StyleWrapper } from './style'

export default memo(function SimiMv(props) {

  /**
   * props and state
   */
  const { title, mvList } = props

  return (
    <StyleWrapper className="cpn-simi-mv">
      <HeaderShort title={title} />
      <div className="content">
        {
          mvList && mvList.map(item => {
            return (
              <div className="mv-item" key={item.id}>
                <NavLink className="image" to={`/mv?id=${item.id}`} title={item.name}>
                  <img src={formatUrlWithSize(item.cover, 96, 54, 'y')} alt="" />
                  <div className="mask">
                    <span className="count">
                      <i className="sprite_icon3 icon"></i>
                      {formatCount(item.playCount)}
                    </span>
                  </div>
                </NavLink>
                <div className="info">
                  <p className="name text-nowrap">
                    <NavLink className="link" to={`/mv?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                  </p>
                  <p className="artist text-nowrap">
                    <NavLink className="link" to={`/artist?id=${item.artistId}`} title={item.artistName}>{item.artistName}</NavLink>
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
    </StyleWrapper>
  )
})

