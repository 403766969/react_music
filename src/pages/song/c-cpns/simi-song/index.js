import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getSimiSongAction } from '../../store/actionCreators'
import { getCurrentSongAction } from '@/components/app-player/store/acitonCreators'

import { NavLink } from 'react-router-dom'

import HeaderSmall from '@/components/header-small'

import {
  StyleWrapper,
  StyleContent
} from './style'

export default memo(function SimiSong(props) {
  const { songId } = props

  const storeState = useSelector(state => ({
    simiSong: state.getIn(['song', 'simiSong'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSimiSongAction(songId))
  }, [dispatch, songId])

  const handlePlay = id => {
    dispatch(getCurrentSongAction(id))
  }

  return (
    <StyleWrapper>
      <HeaderSmall title="相似歌曲" />
      <StyleContent>
        {
          storeState.simiSong.map(item => {
            return (
              <div className="song-item" key={item.id}>
                <div className="info">
                  <div className="title">
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
                  <button className="item sprite_icon3 add" title="添加到播放列表"></button>
                </div>
              </div>
            )
          })
        }
      </StyleContent>
    </StyleWrapper>
  )
})

