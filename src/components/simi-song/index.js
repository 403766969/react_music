import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import * as playerActions from '@/pages/player/store/acitonCreators'

import HeaderShort from '@/components/header-short'
import ArtistsDivide from '@/components/artists-divide'

import { StyleWrapper } from './style'

export default memo(function SimiSong(props) {

  /**
   * props and state
   */
  const { title = '', cpnData = [] } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlay = item => {
    dispatch(playerActions.add_simpleSong_with_song(item, true))
  }

  const handleAdd = item => {
    dispatch(playerActions.add_simpleSong_with_song(item, false))
  }

  return (
    <StyleWrapper className="cpn-simi-song">
      <HeaderShort title={title} />
      <div className="content">
        {
          cpnData.map(item => {
            return (
              <div className="song-item" key={item.id}>
                <div className="info">
                  <div className="song text-nowrap">
                    <NavLink to={`/song?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                  </div>
                  <div className="artists text-nowrap">
                    <ArtistsDivide cpnData={item.artists} />
                  </div>
                </div>
                <div className="operate">
                  <button className="item sprite_icon3 play" title="播放" onClick={() => handlePlay(item)}></button>
                  <button className="item sprite_icon3 add" title="添加到播放列表" onClick={() => handleAdd(item)}></button>
                </div>
              </div>
            )
          })
        }
      </div>
    </StyleWrapper>
  )
})

