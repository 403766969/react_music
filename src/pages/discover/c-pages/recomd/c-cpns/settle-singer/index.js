import React, { memo } from 'react'

import { formatUrlWithSize } from '@/utils/formatter'

import { NavLink } from 'react-router-dom'

import HeaderSmall from '@/components/header-small'

import {
  StyledWrapper,
  StyledContent,
  StyledFooter
} from './style'

export default memo(function SettleSinger(props) {

  /**
   * props and state
   */
  const { settleSingerList = [] } = props

  return (
    <StyledWrapper>
      <HeaderSmall title={'入驻歌手'} more={{ text: '查看全部', link: '/discover/artist/signed' }} />
      <StyledContent>
        {
          settleSingerList.map(item => {
            return (
              <NavLink to={`/user/home?id=${item.id}`} key={item.id} className="item">
                <img src={formatUrlWithSize(item.img1v1Url, 62)} alt="" />
                <div className="info">
                  <div className="title">{item.alias.join('') || item.name}</div>
                  <div className="name">{item.name}</div>
                </div>
              </NavLink>
            )
          })
        }
      </StyledContent>
      <StyledFooter>
        <a href="https://music.163.com/st/musician" target="_blank" rel="noreferrer">申请成为网易音乐人</a>
      </StyledFooter>
    </StyledWrapper>
  )
})
