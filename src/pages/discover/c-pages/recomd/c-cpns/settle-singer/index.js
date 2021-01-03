import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  getUrlWithSize
} from '@/utils/format-utils'

import { getArtistListAction } from '../../store/actionCreators'

import {
  SettleSingerWrapper,
  SettleSingerHeader,
  SettleSingerContent,
  SettleSingerFooter
} from './style'

export default memo(function SettleSinger() {

  const storeState = useSelector(state => ({
    artistList: state.getIn(['recomd', 'artistList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArtistListAction(5001, 5))
  }, [dispatch])

  return (
    <SettleSingerWrapper>
      <SettleSingerHeader>
        <h3>入驻歌手</h3>
        <a href="#/discover/artist/signed/">查看全部 &gt;</a>
      </SettleSingerHeader>
      <SettleSingerContent>
        {
          storeState.artistList.map(item => {
            return (
              <a href={`#/user/home?id=${item.id}`} key={item.id} className="item">
                <img src={getUrlWithSize(item.img1v1Url, 62)} alt="" />
                <div className="info">
                  <div className="title">{item.alias.join('') || item.name}</div>
                  <div className="name">{item.name}</div>
                </div>
              </a>
            )
          })
        }
      </SettleSingerContent>
      <SettleSingerFooter>
        <a href="https://music.163.com/st/musician" target="_blank" rel="noreferrer">申请成为网易音乐人</a>
      </SettleSingerFooter>
    </SettleSingerWrapper>
  )
})
