import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import HeaderShort from '@/components/header-short'

import { StyledWrapper } from './style'

export default memo(function HotArtist(props) {

  /**
   * props and state
   */
  const { artistList } = props

  return (
    <StyledWrapper className="cpn-hot-artist">
      <HeaderShort title={'热门歌手'} more={{ text: '查看全部', link: '/discover/artist' }} />
      <ul className="content">
        {
          artistList && artistList.map(item => {
            return (
              <li className="item" key={item.id} >
                <NavLink className="link" to={`/user/home?id=${item.id}`}>
                  <img className="image" src={formatUrlWithSize(item.img1v1Url, 62)} alt={item.name} title={item.name} />
                  <div className="info">
                    <p className="name text-nowrap" title={item.name}>{item.name}</p>
                    <p className="alias text-nowrap" title={(item.alias && item.alias.join('、')) || item.name}>
                      {(item.alias && item.alias.join('、')) || item.name}
                    </p>
                  </div>
                </NavLink>
              </li>
            )
          })
        }
      </ul>
      <div className="footer">
        <a href="https://music.163.com/st/musician" target="_blank" rel="noreferrer">申请成为网易音乐人</a>
      </div>
    </StyledWrapper>
  )
})
