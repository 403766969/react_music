import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getUrlWithSize } from '@/utils/format-utils'

import { getSongSongsAction } from '../../store/actionCreators'

import { NavLink } from 'react-router-dom'

import HeaderSmall from '@/components/header-small'

import {
  StyleWrapper,
  StyleContent
} from './style'

export default memo(function SongSongs(props) {
  const { songId } = props

  const storeState = useSelector(state => ({
    songSongs: state.getIn(['song', 'songSongs'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongSongsAction(songId))
  }, [dispatch, songId])

  return (
    <StyleWrapper>
      <HeaderSmall title="包含这首歌的歌单" />
      <StyleContent>
        {
          storeState.songSongs.map(item => {
            return (
              <div className="song-item" key={item.id}>
                <NavLink className="image" to={`/playlist?id=${item.id}`} title={item.name}>
                  <img src={getUrlWithSize(item.coverImgUrl, 50)} alt="" />
                </NavLink>
                <div className="info text-nowrap">
                  <NavLink className="name" to={`/playlist?id=${item.id}`} title={item.name}>{item.name}</NavLink>
                  <div className="auchor">
                    by
                    <NavLink className="nickname"
                      to={`/user/home?id=${item.creator.userId}`}
                      title={item.creator.nickname}>{item.creator.nickname}</NavLink>
                  </div>
                </div>
              </div>
            )
          })
        }
      </StyleContent>
    </StyleWrapper>
  )
})

