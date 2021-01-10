import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { formatUrlWithSize } from '@/utils/formatter'

import { action_get_songInfo } from '../../store/actionCreators'

import { NavLink } from 'react-router-dom'

import OperationBar from './c-cpns/operation-bar'

import {
  StyleWrapper,
  StyleContent,
  StyleLeft,
  StyleRight
} from './style'

export default memo(function SongInfo(props) {

  /**
   * props and state
   */
  const { songId } = props

  /**
   * redux hooks
   */
  const { songInfo: r_songInfo } = useSelector(state => ({
    songInfo: state.getIn(['song', 'songInfo'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /** other hooks */
  useEffect(() => {
    dispatch(action_get_songInfo(songId))
  }, [dispatch, songId])

  return (
    <StyleWrapper>
      {
        Object.keys(r_songInfo).length > 0
        && songId + '' === r_songInfo.id + ''
        &&
        <StyleContent>
          <StyleLeft>
            <div className="image">
              <img src={formatUrlWithSize(r_songInfo.al.picUrl, 130)} alt="" />
              <span className="cover image_cover"></span>
            </div>
            <div className="link">
              <i className="sprite_icon2"></i>
              <NavLink to={`/outchain/2/${r_songInfo.id}`} title="生成外联播放器">生成外联播放器</NavLink>
            </div>
          </StyleLeft>
          <StyleRight>
            <div className="header">
              <i className="sprite_icon2"></i>
              <h3 className="title">{r_songInfo.name}</h3>
            </div>
            <div className="singer">
              <span className="label">歌手：</span>
              {
                r_songInfo.ar.map(item => {
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
              <NavLink to={`/album?id=${r_songInfo.al.id}`}
                title={r_songInfo.al.name}
                className="name">
                {r_songInfo.al.name}
              </NavLink>
            </div>
            <OperationBar songId={r_songInfo.id} />
          </StyleRight>
        </StyleContent>
      }
    </StyleWrapper>
  )
})
