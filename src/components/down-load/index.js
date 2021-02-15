import React, { memo } from 'react'

import HeaderShort from '@/components/header-short'

import { StyleWrapper } from './style'

export default memo(function DownLoad() {
  return (
    <StyleWrapper className="cpn-down-load">
      <HeaderShort title="网易云音乐多端下载" />
      <div className="content">
        <div className="sprite_03 icon apple" title="iPhone">
          <a href="https://itunes.apple.com/cn/app/id590338362" target="_blank" rel="noreferrer">iPhone</a>
        </div>
        <div className="sprite_03 icon pc" title="PC">
          <a href="https://music.163.com/api/pc/download/latest" target="_blank" rel="noreferrer">PC</a>
        </div>
        <div className="sprite_03 icon android" title="Android">
          <a href="https://music.163.com/api/android/download/latest2" target="_blank" rel="noreferrer">Android</a>
        </div>
      </div>
      <p>同步歌单，随时畅听320k好音乐</p>
    </StyleWrapper>
  )
})
