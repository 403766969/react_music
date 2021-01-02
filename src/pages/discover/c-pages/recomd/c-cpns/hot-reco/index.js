import React, { memo } from 'react'

import ThemeHeaderRecomd from '@/components/theme-header-recomd'

export default memo(function HotReco() {
  const title = '热门推荐'
  const keywords = [
    {
      title: '华语',
      link: '/discover/playlist/?cat=华语'
    },
    {
      title: '流行',
      link: '/discover/playlist/?cat=流行'
    },
    {
      title: '摇滚',
      link: '/discover/playlist/?cat=摇滚'
    },
    {
      title: '民谣',
      link: '/discover/playlist/?cat=民谣'
    },
    {
      title: '电子',
      link: '/discover/playlist/?cat=电子'
    }
  ]
  const more = {
    title: '更多',
    link: '/discover/playlist'
  }
  return (
    <ThemeHeaderRecomd title={title} keywords={keywords} more={more} />
  )
})
