import React, { memo } from 'react'

import { getUrlWithSize } from '@/utils/format-utils'

import {
  RankListWrapper,
  RankListHeader,
  RankListContent,
  RankListFooter
} from './style'

export default memo(function RankList(props) {
  const { info } = props
  const { tracks = [] } = info

  return (
    <RankListWrapper>
      <RankListHeader>
        <div className="image">
          <img src={getUrlWithSize(info.coverImgUrl, 80)} alt="" />
          <a href={`#/discover/toplist?id=${info.id}`} className="image_cover">ranking</a>
        </div>
        <div className="info">
          <a href={`#/discover/toplist?id=${info.id}`}>{info.name}</a>
          <div>
            <button className="btn play sprite_02"></button>
            <button className="btn favor sprite_02"></button>
          </div>
        </div>
      </RankListHeader>
      <RankListContent>
        {
          tracks.slice(0, 10).map((item, index) => {
            return (
              <div key={item.id} className="list-item">
                <div className="rank">{index + 1}</div>
                <div className="info">
                  <a href={`#/song?id=${item.id}`} className="name text-nowrap">{item.name}</a>
                  <div className="operate">
                    <button className="btn sprite_02 play"></button>
                    <button className="btn sprite_icon2 addto"></button>
                    <button className="btn sprite_02 favor"></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </RankListContent>
      <RankListFooter>
        <a href={`#/discover/toplist?id=${info.id}`}>查看全部 &gt;</a>
      </RankListFooter>
    </RankListWrapper>
  )
})