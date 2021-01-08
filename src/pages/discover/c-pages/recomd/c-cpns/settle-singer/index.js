import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { formatUrlWithSize } from '@/utils/formatter'

import { action_get_settleSingerList } from '../../store/actionCreators'

import { NavLink } from 'react-router-dom'

import HeaderSmall from '@/components/header-small'

import {
  StyledWrapper,
  StyledContent,
  StyledFooter
} from './style'

export default memo(function SettleSinger() {

  /**
   * redux hooks
   */
  const { settleSingerList: r_settleSingerList } = useSelector(state => ({
    settleSingerList: state.getIn(['recomd', 'settleSingerList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_settleSingerList(5001, 5))
  }, [dispatch])

  return (
    <StyledWrapper>
      <HeaderSmall title={'入驻歌手'} more={{ text: '查看全部', link: '/discover/artist/signed' }} />
      <StyledContent>
        {
          r_settleSingerList.map(item => {
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
