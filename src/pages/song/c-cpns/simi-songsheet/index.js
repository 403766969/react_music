import React, { memo } from 'react'

import { formatUrlWithSize } from '@/utils/formatter'

import { NavLink } from 'react-router-dom'

import HeaderSmall from '@/components/header-small'

import {
  StyleWrapper,
  StyleContent
} from './style'

export default memo(function SimiSongsheet(props) {

  /**
   * props and state
   */
  const { simiSongsheet = [] } = props

  return (
    <StyleWrapper>
      <HeaderSmall title="包含这首歌的歌单" />
      <StyleContent>
        {
          simiSongsheet.map(item => {
            return (
              <div className="song-item" key={item.id}>
                <NavLink className="image" to={`/playlist?id=${item.id}`} title={item.name}>
                  <img src={formatUrlWithSize(item.coverImgUrl, 50)} alt="" />
                </NavLink>
                <div className="info text-nowrap">
                  <NavLink className="name" to={`/playlist?id=${item.id}`} title={item.name}>{item.name}</NavLink>
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
      </StyleContent>
    </StyleWrapper>
  )
})
