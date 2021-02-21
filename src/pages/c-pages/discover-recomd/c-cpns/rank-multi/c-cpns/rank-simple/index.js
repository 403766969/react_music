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
  const { cpnData = {} } = props
  const { tracks = [], trackIds = [] } = cpnData

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlay = id => {
    dispatch(playerAction.add_simpleSong(id, true))
  }

  const handleAdd = id => {
    dispatch(playerAction.add_simpleSong(id, false))
  }

  const handleAddList = () => {
    dispatch(playerAction.add_multipleSong_with_trackIds(trackIds, true))
  }

  return Object.keys(cpnData).length > 0 && (
    <StyledWrapper className="cpn-rank-simple">
      <div className="header">
        <div className="image">
          <img src={formatUrlWithSize(cpnData.coverImgUrl, 80)} alt="" />
          <NavLink to={`/discover/toplist?id=${cpnData.id}`} className="image_cover" title={cpnData.name}>ranking</NavLink>
        </div>
        <div className="info">
          <NavLink to={`/discover/toplist?id=${cpnData.id}`} title={cpnData.name}>{cpnData.name}</NavLink>
          <div>
            <button className="btn play sprite_02" title="播放" onClick={handleAddList}></button>
            <button className="btn favor sprite_02" title="收藏"></button>
          </div>
        </div>
      </div>
      <div className="content">
        {
          tracks.slice(0, 10).map((item, index) => {
            return (
              <div key={item.id} className="list-item">
                <div className="rank">{index + 1}</div>
                <div className="info">
                  <NavLink to={`/song?id=${item.id}`} className="name text-nowrap" title={item.name}>{item.name}</NavLink>
                  <div className="operate">
                    <button className="btn sprite_02 play" title="播放" onClick={() => handlePlay(item.id)}></button>
                    <button className="btn sprite_icon2 addto" title="添加到播放列表" onClick={() => handleAdd(item.id)}></button>
                    <button className="btn sprite_02 favor" title="收藏"></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="footer">
        <NavLink to={`/discover/toplist?id=${cpnData.id}`}>查看全部 &gt;</NavLink>
      </div>
    </StyledWrapper>
  )
})
