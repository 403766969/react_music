import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  getUrlWithSize
} from '@/utils/format-utils'

import { getShowSongAction } from '../../store/actionCreators'

import { NavLink } from 'react-router-dom'

import Operation from './c-cpns/operation-bar'

import {
  StyleWrapper,
  StyleContent,
  StyleLeft,
  StyleRight
} from './style'

export default memo(function SongInfo(props) {
  const { songId } = props

  const storeState = useSelector(state => ({
    showSong: state.getIn(['song', 'showSong'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getShowSongAction(songId))
  }, [dispatch, songId])


  return (
    <StyleWrapper>
      {
        Object.keys(storeState.showSong).length > 0
        && songId + '' === storeState.showSong.id + ''
        &&
        <StyleContent>
          <StyleLeft>
            <div className="image">
              <img src={getUrlWithSize(storeState.showSong.al.picUrl, 130)} alt="" />
              <span className="cover image_cover"></span>
            </div>
            <div className="link">
              <i className="sprite_icon2"></i>
              <NavLink to={`/outchain/2/${storeState.showSong.id}`} title="生成外联播放器">生成外联播放器</NavLink>
            </div>
          </StyleLeft>
          <StyleRight>
            <div className="header">
              <i className="sprite_icon2"></i>
              <h3 className="title">{storeState.showSong.name}</h3>
            </div>
            <div className="singer">
              <span className="label">歌手：</span>
              {
                storeState.showSong.ar.map(item => {
                  return (
                    <NavLink key={item.id}
                      to={`/artist?id=${item.id}`}
                      title={item.name}
                      className="name">
                      {item.name}
                    </NavLink>
                  )
                })
              }
            </div>
            <div className="album">
              <span className="label">所属专辑：</span>
              <NavLink to={`/album?id=${storeState.showSong.al.id}`}
                title={storeState.showSong.al.name}
                className="name">
                {storeState.showSong.al.name}
              </NavLink>
            </div>
            <Operation showSong={storeState.showSong} />
          </StyleRight>
        </StyleContent>
      }
    </StyleWrapper>
  )
})
