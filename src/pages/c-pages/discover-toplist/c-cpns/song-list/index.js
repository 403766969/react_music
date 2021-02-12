import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import {
  formatUrlWithSize,
  formatDate
} from '@/utils/formatter'

import {
  action_increase_song
} from '@/pages/player/store/acitonCreators'

import { NavLink } from 'react-router-dom'

import ArtistsDivide from '@/components/artists-divide'

import { StyledWrapper } from './style'

export default memo(function SongList(props) {

  /**
   * props and state
   */
  const { listData = {} } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = id => {
    dispatch(action_increase_song(id, true))
  }

  const handleAddClick = id => {
    dispatch(action_increase_song(id, false))
  }

  return Object.keys(listData).length > 0 && (
    <StyledWrapper className="cpn-song-list">
      <div className="top-header">
        <div className="header-left">
          <h3>歌曲列表</h3>
          <span>{listData.trackCount}首歌</span>
        </div>
        <div className="header-right">
          <div>播放：<span>{listData.playCount}</span>次</div>
        </div>
      </div>
      <table className="song-list">
        <thead>
          <tr>
            <th className="order"></th>
            <th className="title">标题</th>
            <th className="duration">时长</th>
            <th className="singer">歌手</th>
          </tr>
        </thead>
        <tbody>
          {
            listData.trackList.length <= 0 && (
              <tr>
                <td>loading...</td>
              </tr>
            )
          }
          {
            listData.trackList.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="order">{index + 1}</td>
                  <td className="title">
                    {
                      index < 3 && (
                        <NavLink className="song-cover" to={`/song?id=${item.id}`} title={item.name}>
                          <img src={formatUrlWithSize(item.al.picUrl, 50)} alt={item.name} />
                        </NavLink>
                      )
                    }
                    <i className="sprite_table song-play" onClick={() => handlePlayClick(item.id)}></i>
                    <div className="song-content">
                      <div className="song-text text-nowrap">
                        <NavLink className="song-name" to={`/song?id=${item.id}`} title={item.name + (item.alia[0] ? ` - (${item.alia[0]})` : '')}>
                          <span>{item.name}</span>
                        </NavLink>
                        {
                          item.alia[0] && (
                            <span className="song-orgin" title={item.alia[0]}>&nbsp;-&nbsp;({item.alia[0]})</span>
                          )
                        }
                        {
                          item.mv !== 0 && (
                            <NavLink className="song-mv" to={`/mv?id=${item.mv}`} title="播放mv">
                              <i className="sprite_table"></i>
                            </NavLink>
                          )
                        }
                      </div>
                    </div>
                  </td>
                  <td className="duration">
                    <span className="time">{formatDate(item.dt, 'mm:ss')}</span>
                    <div className="operation">
                      <i className="sprite_icon2 btn add" title="添加到播放列表" onClick={() => handleAddClick(item.id)}></i>
                      <i className="sprite_table btn favor" title="收藏"></i>
                      <i className="sprite_table btn share" title="分享"></i>
                      <i className="sprite_table btn download" title="下载"></i>
                    </div>
                  </td>
                  <td className="singer text-nowrap">
                    <ArtistsDivide artists={item.ar} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </StyledWrapper >
  )
})
