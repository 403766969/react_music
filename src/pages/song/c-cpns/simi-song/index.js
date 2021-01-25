import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import {
  action_play_song,
  action_increase_song
} from '@/pages/player/store/acitonCreators'

import { NavLink } from 'react-router-dom'

import HeaderShort from '@/components/header-short'
import ArtistsDivide from '@/components/artists-divide'

import {
  StyleWrapper,
  StyleContent
} from './style'

export default memo(function SimiSong(props) {

  /**
   * props and state
   */
  const { simiSong = [] } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlay = id => {
    dispatch(action_play_song(id))
  }

  const handleAdd = id => {
    dispatch(action_increase_song(id))
  }

  return (
    <StyleWrapper>
      <HeaderShort title="相似歌曲" />
      <StyleContent>
        {
          simiSong.map(item => {
            return (
              <div className="song-item" key={item.id}>
                <div className="info">
                  <div className="song text-nowrap">
                    <NavLink to={`/song?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                  </div>
                  <div className="artists text-nowrap">
                    <ArtistsDivide artists={item.artists} />
                  </div>
                </div>
                <div className="operate">
                  <button className="item sprite_icon3 play" title="播放" onClick={e => handlePlay(item.id)}></button>
                  <button className="item sprite_icon3 add" title="添加到播放列表" onClick={e => handleAdd(item.id)}></button>
                </div>
              </div>
            )
          })
        }
      </StyleContent>
    </StyleWrapper>
  )
})

