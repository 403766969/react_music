import React, { memo } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { formatDate } from '@/utils/formatter'

import {
  action_toggle_song,
  action_remove_song
} from '../../../../store/acitonCreators'

import ArtistsDivide from '@/components/artists-divide'

import {
  StyledWrapper
} from './style'

export default memo(function PanelPlaylist() {

  /**
   * redux hooks
   */
  const {
    songList: r_songList,
    currentSongIndex: r_currentSongIndex
  } = useSelector(state => ({
    songList: state.getIn(['player', 'songList']),
    currentSongIndex: state.getIn(['player', 'currentSongIndex'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handleItemClick = index => {
    dispatch(action_toggle_song(index))
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
              className={`play-item ${r_currentSongIndex === index ? 'active' : ''}`}
              onClick={e => handleItemClick(index)}>
              <div className="left">
                <div className="song text-nowrap">
                  {item.name}
                </div>
              </div>
              <div className="right">
                <div className="operation">
                  <i className="sprite_playlist favor" title="收藏"></i>
                  <i className="sprite_playlist share" title="分享"></i>
                  <i className="sprite_playlist download" title="下载"></i>
                  <i className="sprite_playlist remove" title="删除" onClick={e => hadleRemoveClick(index, e)}></i>
                </div>
                <div className="artists text-nowrap" onClick={e => e.stopPropagation()}>
                  <ArtistsDivide artists={item.ar} />
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
