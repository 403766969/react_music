import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import HeaderShort from '@/components/header-short'

import { StyledWrapper } from './style'

export default memo(function SettleSinger(props) {

  /**
   * props and state
   */
  const { settleSingerList = [] } = props

  return (
    <StyledWrapper className="cpn-settle-singer">
      <HeaderShort title={'入驻歌手'} more={{ text: '查看全部', link: '/discover/artist/signed' }} />
      <div className="content">
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
      </div>
      <div className="footer">
        <a href="https://music.163.com/st/musician" target="_blank" rel="noreferrer">申请成为网易音乐人</a>
      </div>
    </StyledWrapper>
  )
})
