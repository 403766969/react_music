import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { formatUrlWithSize } from '@/utils/formatter'

import { action_get_simiPlaylist } from '../../store/actionCreators'

import { NavLink } from 'react-router-dom'

import HeaderSmall from '@/components/header-small'

import {
  StyleWrapper,
  StyleContent
} from './style'

export default memo(function SimiPlaylist(props) {

  /**
   * props and state
   */
  const { songId } = props

  /**
   * redux hooks
   */
  const { simiPlaylist: r_simiPlaylist } = useSelector(state => ({
    simiPlaylist: state.getIn(['song', 'simiPlaylist'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_simiPlaylist(songId))
  }, [dispatch, songId])

  return (
    <StyleWrapper>
      <HeaderSmall title="包含这首歌的歌单" />
      <StyleContent>
        {
          r_simiPlaylist.map(item => {
            return (
              <div className="song-item" key={item.id}>
                <NavLink className="image" to={`/playlist?id=${item.id}`} title={item.name}>
                  <img src={formatUrlWithSize(item.coverImgUrl, 50)} alt="" />
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

