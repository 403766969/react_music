import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import * as playerAction from '@/pages/player/store/acitonCreators'

import { NavLink } from 'react-router-dom'

import ArtistsDivide from '@/components/artists-divide'

import { StyledWrapper } from './style'

export default memo(function SongList(props) {

  /**
   * props and state
   */
  const { listData = {} } = props

  const { order = 0, duration = 0, singer = 0, album = 0 } = props

  const { showCoverCount = 0 } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = id => {
    dispatch(playerAction.add_simpleSong(id, true))
  }

  const handleAddClick = id => {
    dispatch(playerAction.add_simpleSong(id, false))
  }

  return Object.keys(listData).length > 0 && (
    <StyledWrapper className="cpn-song-list" order={order} duration={duration} singer={singer} album={album}>
      <div className="top-header">
        <div className="header-left">
          <h3>歌曲列表</h3>
          <span>{listData.trackCount}首歌</span>
        </div>
        <div className="header-right">
          <div className="link">
            <i className="sprite_icon2"></i>
            <a href={`https://music.163.com/#/outchain/0/${listData.id}`} title="生成外联播放器" target="_blank" rel="noreferrer">生成外联播放器</a>
          </div>
          <div className="count">播放：<span>{listData.playCount}</span>次</div>
        </div>
      </div>
      <table className="song-list">
        <thead>
          <tr>
            {
              order > 0 && (<th className="order"></th>)
            }
            <th className="title">标题</th>
            {
              duration > 0 && (<th className="duration">时长</th>)
            }
            {
              singer > 0 && (<th className="singer">歌手</th>)
            }
            {
              album > 0 && (<th className="album">专辑</th>)
            }
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
                  {
                    order > 0 && (
                      <td className="order">{index + 1}</td>
                    )
                  }
                  <td className="title">
                    {
                      index < showCoverCount && (
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
                  {
                    duration > 0 && (
                      <td className="duration">
                        <span className="time">{formatDate(item.dt, 'mm:ss')}</span>
                        <div className="operation">
                          <i className="sprite_icon2 btn add" title="添加到播放列表" onClick={() => handleAddClick(item.id)}></i>
                          <i className="sprite_table btn favor" title="收藏"></i>
                          <i className="sprite_table btn share" title="分享"></i>
                          <i className="sprite_table btn download" title="下载"></i>
                        </div>
                      </td>
                    )
                  }
                  {
                    singer > 0 && (
                      <td className="singer text-nowrap">
                        <ArtistsDivide artists={item.ar} />
                      </td>
                    )
                  }
                  {
                    album > 0 && (
                      <td className="album text-nowrap">
                        <NavLink className="song-album" to={`/album?id=${item.al.id}`} title={item.al.name}>
                          {item.al.name}
                        </NavLink>
                      </td>
                    )
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </StyledWrapper >
  )
})
