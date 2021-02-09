import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { playModeTypes } from './constants'

import {
  formatUrlWithSize,
  formatDate
} from '@/utils/formatter'

import {
  action_init_songList,
  action_toggle_song,
  action_set_currentLyricIndex
} from '../../store/acitonCreators'

import { NavLink } from 'react-router-dom'

import { Slider } from 'antd'

import ArtistsDivide from '@/components/artists-divide'

import PlayerPanel from '../player-panel'

import {
  StyleWrapper,
  StyleContent,
  StyleControl,
  StyleDetail,
  StyleOperator,
  StyleLock
} from './style'

export default memo(function PlayerBar() {

  /**
   * props and state
   */
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progessValue, setProgessValue] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isChanging, setIsChaning] = useState(false)

  const [volume, setVolume] = useState(() => {
    const s_volume = window.localStorage.getItem('volume')
      ? Number(window.localStorage.getItem('volume'))
      : 50
    return s_volume
  })

  const [isShowVolume, setIsShowVolume] = useState(false)

  const [playMode, setPlayMode] = useState(() => {
    const s_playMode = window.localStorage.getItem('playMode')
      ? JSON.parse(window.localStorage.getItem('playMode'))
      : {
        type: playModeTypes.LIST_LOOP,
        class: 'list-loop',
        title: '列表循环'
      }
    return s_playMode
  })

  const [isLocked, setIsLocked] = useState(() => {
    const s_lock = window.localStorage.getItem('lock')
      ? Number(window.localStorage.getItem('lock'))
      : 0
    return s_lock ? true : false
  })

  const [isShowPanel, setIsShowPanel] = useState(false)

  /**
   * redux hooks
   */
  const {
    songList: r_songList,
    currentSong: r_currentSong,
    currentSongIndex: r_currentSongIndex,
    currentLyric: r_currentLyric,
    currentLyricIndex: r_currentLyricIndex,
    isInited: r_isInited
  } = useSelector(state => ({
    songList: state.getIn(['player', 'songList']),
    currentSong: state.getIn(['player', 'currentSong']),
    currentSongIndex: state.getIn(['player', 'currentSongIndex']),
    currentLyric: state.getIn(['player', 'currentLyric']),
    currentLyricIndex: state.getIn(['player', 'currentLyricIndex']),
    isInited: state.getIn(['player', 'isInited'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const audioRef = useRef()

  // 初始化播放列表
  useEffect(() => {
    dispatch(action_init_songList())
  }, [dispatch])

  // 当前歌曲改变时
  useEffect(() => {
    if (Object.keys(r_currentSong).length > 0) {
      audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${r_currentSong.id}.mp3`
      audioRef.current.play().catch(() => {
        audioRef.current.pause()
        setIsPlaying(!audioRef.current.paused)
      })
      setDuration(r_currentSong.dt)
      setCurrentTime(0)
      setProgessValue(0)
      setIsPlaying(!audioRef.current.paused)
    } else {
      audioRef.current.src = ''
      audioRef.current.pause()
      setDuration(0)
      setCurrentTime(0)
      setProgessValue(0)
      setIsPlaying(false)
    }
  }, [r_currentSong])

  // 音量改变时
  useEffect(() => {
    audioRef.current.volume = volume / 100
  }, [volume])

  // 初始化完成时
  useEffect(() => {
    if (r_isInited) {
      audioRef.current.pause()
      setCurrentTime(0)
      setProgessValue(0)
      setIsPlaying(!audioRef.current.paused)
    }
  }, [r_isInited])

  /**
   * other logic
   */

  // 播放/暂停
  const handlePlayPauseSong = () => {
    if (Object.keys(r_currentSong) <= 0) {
      return
    }
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {
        audioRef.current.pause()
        setIsPlaying(!audioRef.current.paused)
      })
    } else {
      audioRef.current.pause()
    }
    setIsPlaying(!audioRef.current.paused)
  }

  // 上一首/下一首
  const handleChangeCurrentSong = offset => {
    const length = r_songList.length
    if (length <= 0) {
      return
    }
    let index = r_currentSongIndex
    switch (playMode.type) {
      case playModeTypes.RANDOM_PLAY:
        while (index === r_currentSongIndex) {
          index = Math.floor(Math.random() * length)
        }
        break
      default:
        index = index + offset
        if (index < 0) {
          index = length - 1
        } else if (index > length - 1) {
          index = 0
        }
    }
    dispatch(action_toggle_song(index))
  }

  // 播放时间
  const handleTimeUpdate = e => {
    const audio_currentTime = e.target.currentTime * 1000
    if (!isChanging) {
      setCurrentTime(audio_currentTime)
      setProgessValue(audio_currentTime / duration * 100)
    }
    let lyricIndex = -1
    const lastLyric = r_currentLyric[r_currentLyric.length - 1]
    if (lastLyric && audio_currentTime >= lastLyric.time) {
      lyricIndex = r_currentLyric.length - 1
    } else {
      for (let i = 0; i < r_currentLyric.length; i++) {
        if (audio_currentTime <= r_currentLyric[i].time) {
          lyricIndex = i - 1
          break
        }
      }
    }
    if (lyricIndex !== r_currentLyricIndex) {
      dispatch(action_set_currentLyricIndex(lyricIndex))
    }
  }

  // 播放结束
  const handleEnded = () => {
    audioRef.current.pause()
    setIsPlaying(!audioRef.current.paused)
    if (playMode.type === playModeTypes.SINGLE_LOOP) {
      audioRef.current.play().catch(() => {
        audioRef.current.pause()
        setIsPlaying(!audioRef.current.paused)
      })
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      setProgessValue(0)
      setIsPlaying(!audioRef.current.paused)
      dispatch(action_set_currentLyricIndex(-1))
    } else {
      handleChangeCurrentSong(1)
    }
  }

  // 调节进度条
  const handleSliderChange = useCallback(value => {
    setIsChaning(true)
    setCurrentTime(duration * value / 100)
    setProgessValue(value)
  }, [duration])

  // 调节进度条完成
  const handleAfterSliderChange = useCallback(value => {
    audioRef.current.currentTime = duration * value / 100 / 1000
    setCurrentTime(duration * value / 100)
    setIsChaning(false)
  }, [duration])

  // 显示音量
  const handleVolumeClick = () => {
    setIsShowVolume(!isShowVolume)
  }

  // 调节音量
  const handleVolumeChange = useCallback(value => {
    setVolume(value)
  }, [])

  // 调节音量完成
  const handleAfterVolumeChange = useCallback(value => {
    window.localStorage.setItem('volume', value)
  }, [])

  // 切换播放模式
  const handleChangePlayMode = () => {
    let newPlayMode = {}
    switch (playMode.type) {
      case playModeTypes.LIST_LOOP:
        newPlayMode = {
          type: playModeTypes.SINGLE_LOOP,
          class: 'single-loop',
          title: '单曲循环'
        }
        break
      case playModeTypes.SINGLE_LOOP:
        newPlayMode = {
          type: playModeTypes.RANDOM_PLAY,
          class: 'random-play',
          title: '随机播放'
        }
        break
      case playModeTypes.RANDOM_PLAY:
        newPlayMode = {
          type: playModeTypes.LIST_LOOP,
          class: 'list-loop',
          title: '列表循环'
        }
        break
      default:
        newPlayMode = {
          type: playModeTypes.LIST_LOOP,
          class: 'list-loop',
          title: '列表循环'
        }
    }
    setPlayMode(newPlayMode)
    window.localStorage.setItem('playMode', JSON.stringify(newPlayMode))
  }

  // 锁定播放器
  const handleLockClick = () => {
    if (!isLocked) {
      window.localStorage.setItem('lock', 1)
    } else {
      window.localStorage.setItem('lock', 0)
    }
    setIsLocked(!isLocked)
  }

  // 关闭歌曲列表
  const handleCloseClick = useCallback(() => {
    setIsShowPanel(false)
  }, [])

  return (
    <StyleWrapper className={`cpn-player-bar sprite_playbar ${(isLocked || isShowPanel) ? '' : 'hidden'}`}>
      <StyleContent>
        <StyleControl isPlaying={isPlaying}>
          <button className="sprite_playbar btn prev" title="上一首(ctrl+←)" onClick={e => handleChangeCurrentSong(-1)}></button>
          <button className="sprite_playbar btn play" title="播放/暂停(p)" onClick={handlePlayPauseSong}></button>
          <button className="sprite_playbar btn next" title="下一首(ctrl+→)" onClick={e => handleChangeCurrentSong(1)}></button>
        </StyleControl>
        <StyleDetail>
          <div className="image">
            {
              Object.keys(r_currentSong).length > 0
                ? (
                  <NavLink to={`/song?id=${r_currentSong.id}`}>
                    <img src={formatUrlWithSize(r_currentSong.al.picUrl, 34)} alt="" />
                    <div className="sprite_playbar mask"></div>
                  </NavLink>
                )
                : (
                  <div>
                    <img src={require('@/assets/img/default_album.jpg').default} alt="" />
                    <div className="sprite_playbar mask"></div>
                  </div>
                )
            }
          </div>
          <div className="info">
            <div className="text">
              {
                Object.keys(r_currentSong).length > 0
                  ? (
                    <div className="song text-nowrap">
                      <NavLink
                        to={`/song?id=${r_currentSong.id}`}
                        title={r_currentSong.name}>{r_currentSong.name}</NavLink>
                    </div>
                  )
                  : null
              }
              {
                Object.keys(r_currentSong).length > 0
                  ? (
                    <div className="artists text-nowrap">
                      <ArtistsDivide artists={r_currentSong.ar} />
                    </div>
                  )
                  : null
              }
            </div>
            <div className="progress">
              <Slider
                step={0.1}
                tipFormatter={null}
                value={progessValue}
                onChange={handleSliderChange}
                onAfterChange={handleAfterSliderChange}
                disabled={!Object.keys(r_currentSong).length > 0} />
              <div className="time">
                <span className="now-time">{formatDate(currentTime, 'mm:ss')}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatDate(duration, 'mm:ss')}</span>
              </div>
            </div>
          </div>
        </StyleDetail>
        <StyleOperator>
          <div className="left">
            <button className="sprite_playbar btn favor" title="收藏"></button>
            <button className="sprite_playbar btn share" title="分享"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume" title="音量" onClick={handleVolumeClick}>
              <div className={`sprite_playbar volume-bar ${isShowVolume ? '' : 'hidden'}`} onClick={e => e.stopPropagation()}>
                <Slider value={volume} onChange={handleVolumeChange} onAfterChange={handleAfterVolumeChange} vertical />
              </div>
            </button>
            <button
              className={`sprite_playbar btn ${playMode.class}`}
              title={playMode.title}
              onClick={handleChangePlayMode}></button>
            <button
              className="sprite_playbar btn playlist"
              title="播放列表"
              onClick={e => setIsShowPanel(!isShowPanel)}>{r_songList.length <= 99 ? r_songList.length : '99+'}</button>
          </div>
        </StyleOperator>
      </StyleContent>
      <StyleLock className="sprite_playbar">
        <i
          className={`sprite_playbar ${isLocked ? 'locked' : ''}`}
          title={isLocked ? '解锁' : '锁定'}
          onClick={handleLockClick}
        ></i>
      </StyleLock>
      <PlayerPanel isShowPanel={isShowPanel} handleCloseClick={handleCloseClick} />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
    </StyleWrapper>
  )
})
