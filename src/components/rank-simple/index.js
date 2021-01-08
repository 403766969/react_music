import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import { formatUrlWithSize } from '@/utils/formatter'

import { action_get_currentSong } from '@/components/app-player/store/acitonCreators'

import { NavLink } from 'react-router-dom'

import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledFooter
} from './style'

export default memo(function RankSimple(props) {

  /**
   * props and state
   */
  const { rankSimpleInfo } = props
  const { tracks = [] } = rankSimpleInfo

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlay = id => {
    dispatch(action_get_currentSong(id))
  }

  return (
    <StyledWrapper>
      <StyledHeader>
        <div className="image">
          <img src={formatUrlWithSize(rankSimpleInfo.coverImgUrl, 80)} alt="" />
          <NavLink to={`/discover/toplist?id=${rankSimpleInfo.id}`} className="image_cover" title={rankSimpleInfo.name}>ranking</NavLink>
        </div>
        <div className="info">
          <NavLink to={`/discover/toplist?id=${rankSimpleInfo.id}`} title={rankSimpleInfo.name}>{rankSimpleInfo.name}</NavLink>
          <div>
            <button className="btn play sprite_02" title="播放"></button>
            <button className="btn favor sprite_02" title="收藏"></button>
          </div>
        </div>
      </StyledHeader>
      <StyledContent>
        {
          tracks.slice(0, 10).map((item, index) => {
            return (
              <div key={item.id} className="list-item">
                <div className="rank">{index + 1}</div>
                <div className="info">
                  <NavLink to={`/song?id=${item.id}`} className="name text-nowrap" title={item.name}>{item.name}</NavLink>
                  <div className="operate">
                    <button className="btn sprite_02 play" title="播放" onClick={e => handlePlay(item.id)}></button>
                    <button className="btn sprite_icon2 addto" title="添加到播放列表"></button>
                    <button className="btn sprite_02 favor" title="收藏"></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </StyledContent>
      <StyledFooter>
        <NavLink to={`/discover/toplist?id=${rankSimpleInfo.id}`}>查看全部 &gt;</NavLink>
      </StyledFooter>
    </StyledWrapper>
  )
})
