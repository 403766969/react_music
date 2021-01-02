import React, { memo } from 'react'

import {
  getUrlWithSize,
  getCount
} from '@/utils/format-utils'

import { NavLink } from 'react-router-dom'

import {
  SongsCoverWrapper,
  SongsCoverImage,
  SongsCoverDec
} from './style'

export default memo(function SongsCover(props) {
  const { songsInfo, isShowAuthor = false } = props

  return (
    <SongsCoverWrapper>
      <SongsCoverImage>
        <img className="image" src={getUrlWithSize(songsInfo.picUrl || songsInfo.coverImgUrl, 140)} alt="" />
        <div className="mask sprite_covor"></div>
        <div className="heat sprite_covor">
          <span>
            <i className="sprite_icon count"></i>
            {getCount(songsInfo.playCount)}
          </span>
          <span>
            <i className="sprite_icon play"></i>
          </span>
        </div>
      </SongsCoverImage>
      <SongsCoverDec>
        <p className={'cover-name' + (isShowAuthor ? ' text-nowrap' : '')}>
          <NavLink to={`/discover/playlist?id=${songsInfo.id}`}>{songsInfo.name}</NavLink>
        </p>
        {
          isShowAuthor && (
            <p className="cover-author text-nowrap">
              <span>by</span>
              <NavLink to={`/discover/playlist?id=${songsInfo.id}`}>{songsInfo.copywriter || songsInfo.creator.nickname}</NavLink>
            </p>
          )
        }
      </SongsCoverDec>
    </SongsCoverWrapper>
  )
})
