import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import HeaderShort from '@/components/header-short'

import { StyleWrapper } from './style'

export default memo(function SimiSongsheet(props) {

  /**
   * props and state
   */
  const { title = '', listData = [] } = props

  return listData.length > 0 && (
    <StyleWrapper className="cpn-simi-songsheet">
      <HeaderShort title={title} />
      <div className="content">
        {
          listData.map(item => {
            return (
              <div className="song-item" key={item.id}>
                <NavLink className="image" to={`/songsheet?id=${item.id}`} title={item.name}>
                  <img src={formatUrlWithSize(item.coverImgUrl, 50)} alt="" />
                </NavLink>
                <div className="info text-nowrap">
                  <NavLink className="name" to={`/songsheet?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                  <div className="auchor">
                    by
                    <NavLink className="nickname"
                      to={`/user/home?id=${item.creator.userId}`}
                      title={item.creator.nickname}>{item.creator.nickname}</NavLink>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </StyleWrapper>
  )
})

