import React, { memo } from 'react'

import {
  hotAnchors
} from '@/services/local-data'

import {
  HotAnchorWrapper,
  HotAnchorHeader,
  HotAnchorContent
} from './style'

export default memo(function HotAnchor() {
  return (
    <HotAnchorWrapper>
      <HotAnchorHeader>
        <h3>热门主播</h3>
      </HotAnchorHeader>
      <HotAnchorContent>
        {
          hotAnchors.map(item => {
            return (
              <div className="item" key={item.id}>
                <a href={`#/user/home?id=${item.id}`} className="image">
                  <img src={item.picUrl} alt="" />
                </a>
                <div className="info">
                  <a href={`#/user/home?id=${item.id}`} className="name">{item.name}</a>
                  <div className="position text-nowrap">{item.position}</div>
                </div>
              </div>
            )
          })
        }
      </HotAnchorContent>
    </HotAnchorWrapper>
  )
})
