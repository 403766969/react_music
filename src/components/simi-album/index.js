import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import HeaderShort from '@/components/header-short'

import { StyleWrapper } from './style'

export default memo(function SimiAlbum(props) {

  /**
   * props and state
   */
  const { title, albumList } = props

  return (
    <StyleWrapper className="cpn-simi-album">
      <HeaderShort title={title} />
      <div className="content">
        {
          albumList && albumList.map(item => {
            return (
              <div className="album-item" key={item.id}>
                <NavLink className="image" to={`/album?id=${item.id}`} title={item.name}>
                  <img src={formatUrlWithSize(item.picUrl, 50)} alt="" />
                </NavLink>
                <div className="info text-nowrap">
                  <NavLink className="name" to={`/album?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                  <p className="time">{formatDate(item.publishTime, 'yyyy-MM-dd')}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </StyleWrapper>
  )
})

