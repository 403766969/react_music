import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import LoadingSpin from '@/components/loading-spin'

import { StyledWrapper } from './style'

export default memo(function HotRadio(props) {

  /**
   * props and state
   */
  const { hotRadioList, isLoading } = props

  return (
    <StyledWrapper className="cpn-hot-radio">
      <div className="header">
        <h3 className="title">电台排行榜</h3>
      </div>
      {
        isLoading
          ? (
            <LoadingSpin text="加载中..." />
          )
          : (
            <ul className="list">
              {
                hotRadioList && hotRadioList.map(item => {
                  return (
                    <li className="item" key={item.id}>
                      <div className="cover">
                        <NavLink to={`/radio?id=${item.id}`} title={item.name}>
                          <img src={formatUrlWithSize(item.picUrl, 120, 120, 'y')} alt="" />
                        </NavLink>
                      </div>
                      <div className="text">
                        <h3 className="name text-nowrap">
                          <NavLink className="link" to={`/radio?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                        </h3>
                        <div className="dj text-nowrap">
                          <i className="sprite_icon2 icon"></i>
                          <NavLink className="link" to={`/user/homt?id=${item.dj.userId}`} title={item.dj.nickname}>{item.dj.nickname}</NavLink>
                        </div>
                        <p className="count text-nowrap">
                          <span className="programCount">共{item.programCount}期</span>
                          <span className="subCount">订阅{item.subCount}次</span>
                        </p>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          )
      }
    </StyledWrapper>
  )
})
