import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import * as playerAction from '@/pages/player/store/acitonCreators'

import { StyledWrapper } from './style'

export default memo(function RankSimple(props) {

  /**
   * props and state
   */
  const { rankInfo } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlay = item => {
    dispatch(playerAction.add_simpleSong_with_songObject(item, true))
  }

  const handleAdd = item => {
    dispatch(playerAction.add_simpleSong_with_songObject(item, false))
  }

  const handleAddList = () => {
    dispatch(playerAction.add_multipleSong_with_trackIds(rankInfo.trackIds, true))
  }

  return rankInfo
    ? (
      <StyledWrapper className="cpn-rank-simple">
        <div className="header">
          <div className="image">
            <img src={formatUrlWithSize(rankInfo.coverImgUrl, 80)} alt="" />
            <NavLink to={`/discover/toplist?id=${rankInfo.id}`} className="image_cover" title={rankInfo.name}>ranking</NavLink>
          </div>
          <div className="info">
            <NavLink to={`/discover/toplist?id=${rankInfo.id}`} title={rankInfo.name}>{rankInfo.name}</NavLink>
            <div>
              <button className="btn play sprite_02" title="播放" onClick={handleAddList}></button>
              <button className="btn favor sprite_02" title="收藏"></button>
            </div>
          </div>
        </div>
        <div className="content">
          {
            rankInfo.tracks && rankInfo.tracks.slice(0, 10).map((item, index) => {
              return (
                <div key={item.id} className="list-item">
                  <div className="rank">{index + 1}</div>
                  <div className="info">
                    <NavLink to={`/song?id=${item.id}`} className="name text-nowrap" title={item.name}>{item.name}</NavLink>
                    <div className="operate">
                      <button className="btn sprite_02 play" title="播放" onClick={() => handlePlay(item)}></button>
                      <button className="btn sprite_icon2 addto" title="添加到播放列表" onClick={() => handleAdd(item)}></button>
                      <button className="btn sprite_02 favor" title="收藏"></button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="footer">
          <NavLink to={`/discover/toplist?id=${rankInfo.id}`}>查看全部 &gt;</NavLink>
        </div>
      </StyledWrapper>
    )
    : null
})
