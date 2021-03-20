import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function RecomdRadio(props) {

  /**
   * props and state
   */
  const { recomdRadioList } = props

  return (
    <StyledWrapper className="cpn-recomd-radio">
      <div className="header">
        <h3 className="title">优秀新电台</h3>
      </div>
      <ul className="list">
        {
          recomdRadioList && recomdRadioList.map(item => {
            return (
              <li className="item" key={item.id}>
                <div className="cover">
                  <NavLink to={`/radio?id=${item.id}`} title={item.name}>
                    <img src={formatUrlWithSize(item.picUrl, 150, 150, 'y')} alt="" />
                  </NavLink>
                </div>
                <div className="text">
                  <p className="name text-nowrap">
                    <NavLink className="link" to={`/radio?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                  </p>
                  <p className="desc text-nowrap-l2">{item.rcmdtext}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
