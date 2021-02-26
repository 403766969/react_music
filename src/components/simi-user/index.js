import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import HeaderShort from '@/components/header-short'

import { StyleWrapper } from './style'

export default memo(function SimiUser(props) {

  /**
   * props and state
   */
  const { title, userList } = props

  return (
    <StyleWrapper className="cpn-simi-user">
      <HeaderShort title={title} />
      <div className="content">
        {
          userList && userList.map(item => {
            return (
              <div className="user-item" key={item.userId}>
                <NavLink to={`/user/home?id=${item.userId}`} title={item.nickname}>
                  <img className="avatar" src={formatUrlWithSize(item.avatarUrl, 40)} alt="" />
                </NavLink>
              </div>
            )
          })
        }
      </div>
    </StyleWrapper>
  )
})

