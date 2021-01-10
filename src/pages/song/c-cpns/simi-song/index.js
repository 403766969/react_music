import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { action_get_simiSong } from '../../store/actionCreators'
import {
  action_play_song,
  action_increase_song
} from '@/components/app-player/store/acitonCreators'

import { NavLink } from 'react-router-dom'

import HeaderSmall from '@/components/header-small'

import {
  StyleWrapper,
  StyleContent
} from './style'

export default memo(function SimiSong(props) {

  /**
   * props and state
   */
  const { songId } = props

  /**
   * redux hooks
   */
  const { simiSong: r_simiSong } = useSelector(state => ({
    simiSong: state.getIn(['song', 'simiSong'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_simiSong(songId))
  }, [dispatch, songId])

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
      <HeaderSmall title="相似歌曲" />
      <StyleContent>
        {
          r_simiSong.map(item => {
            return (
              <div className="song-item" key={item.id}>
                <div className="info">
                  <div className="title text-nowrap">
                    <NavLink to={`/song?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                  </div>
                  <div className="artist">
                    {
                      item.artists.map(art => {
                        return (
                          <NavLink key={art.id}
                            to={`/artist?id=${art.id}`}
                            title={art.name}>
                            {art.name}
                          </NavLink>
                        )
                      })
                    }
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

