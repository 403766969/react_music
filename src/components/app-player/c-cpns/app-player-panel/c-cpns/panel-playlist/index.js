import React, { memo } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { formatDate } from '@/utils/formatter'

import {
  action_set_currentSong,
  action_set_currentIndex,
  action_remove_song
} from '../../../../store/acitonCreators'

import { NavLink } from 'react-router-dom'

import {
  StyledWrapper
} from './style'

export default memo(function PanelPlaylist() {

  /**
   * redux hooks
   */
  const {
    songList: r_songList,
    currentIndex: r_currentIndex
  } = useSelector(state => ({
    songList: state.getIn(['player', 'songList']),
    currentIndex: state.getIn(['player', 'currentIndex'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handleItemClick = index => {
    dispatch(action_set_currentIndex(index))
    dispatch(action_set_currentSong(r_songList[index]))
  }

  const hadleRemoveClick = (index, e) => {
    e.stopPropagation()
    dispatch(action_remove_song(index))
  }

  return (
    <StyledWrapper>
      {
        r_songList.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`play-item ${r_currentIndex === index ? 'active' : ''}`}
              onClick={e => handleItemClick(index)}>
              <div className="left text-nowrap">{item.name}</div>
              <div className="right">
                <div className="operation">
                  <i className="sprite_playlist favor" title="收藏"></i>
                  <i className="sprite_playlist share" title="分享"></i>
                  <i className="sprite_playlist download" title="下载"></i>
                  <i className="sprite_playlist remove" title="删除" onClick={e => hadleRemoveClick(index, e)}></i>
                </div>
                <div className="singer text-nowrap" onClick={e => e.stopPropagation()}>
                  {
                    item.ar.map(arItem => {
                      return (
                        <NavLink key={arItem.id}
                          to={`/artist?id=${arItem.id}`}
                          title={arItem.name}>{arItem.name}</NavLink>
                      )
                    })
                  }
                </div>
                <div className="duration">{formatDate(item.dt, 'mm:ss')}</div>
                <div className="sprite_playlist link" title="来自榜单"></div>
              </div>
            </li>
          )
        })
      }
    </StyledWrapper>
  )
})
