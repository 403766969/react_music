import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { playModeConst } from './constants'

import {
  formatUrlWithSize,
  formatDate
} from '@/utils/formatter'

import {
  action_init_songList,
  action_set_currentIndex,
  action_set_currentSong,
  action_set_playMode
} from '../store/acitonCreators'

import { NavLink } from 'react-router-dom'

import { Slider } from 'antd'

import {
  StyleWrapper,
  StyleContent,
  StyleControl,
  StyleDetail,
  StyleOperator
} from './style'

export default memo(function AppPlayerBar() {

  /**
   * props and state
   */
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progessValue, setProgessValue] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isChanging, setIsChaning] = useState(false)

  const [playModeClass, setPlayModeClass] = useState('list-loop')
  const [playModeTitle, setPlayModeTitle] = useState('列表循环')

  /**
   * redux hooks
   */
  const {
    songList: r_songList,
    currentSong: r_currentSong,
    currentIndex: r_currentIndex,
    playMode: r_playMode,
    isInited: r_isInited
  } = useSelector(state => ({
    songList: state.getIn(['player', 'songList']),
    currentSong: state.getIn(['player', 'currentSong']),
    currentIndex: state.getIn(['player', 'currentIndex']),
    playMode: state.getIn(['player', 'playMode']),
    isInited: state.getIn(['player', 'isInited'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const audioRef = useRef()

  useEffect(() => {
    dispatch(action_init_songList())
  }, [dispatch])

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
      setIsChaning(false)
    }
  }, [r_currentSong])

  useEffect(() => {
    if (r_isInited) {
      audioRef.current.pause()
      setCurrentTime(0)
      setProgessValue(0)
      setIsPlaying(!audioRef.current.paused)
      setIsChaning(false)
    }
  }, [r_isInited])

  /**
   * other logic
   */
  const handlePlayPauseSong = () => {
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

  const handleChangeCurrentSong = offset => {
    const length = r_songList.length
    if (length < 0) {
      return
    }
    let index = r_currentIndex
    switch (r_playMode) {
      case playModeConst.SINGLE_LOOP:
        index = r_currentIndex
        break
      case playModeConst.RANDOM_PLAY:
        while (index === r_currentIndex) {
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
    dispatch(action_set_currentIndex(index))
    dispatch(action_set_currentSong(r_songList[index]))
  }

  const handleChangePlayMode = () => {
    switch (r_playMode) {
      case playModeConst.LIST_LOOP:
        setPlayModeClass('single-loop')
        setPlayModeTitle('单曲循环')
        dispatch(action_set_playMode(playModeConst.SINGLE_LOOP))
        break
      case playModeConst.SINGLE_LOOP:
        setPlayModeClass('random-play')
        setPlayModeTitle('随机播放')
        dispatch(action_set_playMode(playModeConst.RANDOM_PLAY))
        break
      case playModeConst.RANDOM_PLAY:
        setPlayModeClass('list-loop')
        setPlayModeTitle('列表循环')
        dispatch(action_set_playMode(playModeConst.LIST_LOOP))
        break
      default:
        setPlayModeClass('list-loop')
        setPlayModeTitle('列表循环')
        dispatch(action_set_playMode(playModeConst.LIST_LOOP))
    }
  }

  const handleTimeUpdate = e => {
    if (!isChanging) {
      setCurrentTime(e.target.currentTime * 1000)
      setProgessValue(e.target.currentTime * 1000 / duration * 1000)
    }
  }

  const handleSliderChange = useCallback(value => {
    setIsChaning(true)
    setCurrentTime(duration * value / 1000)
    setProgessValue(value)
  }, [duration])

  const handleAfterSliderChange = useCallback(value => {
    audioRef.current.currentTime = duration * value / 1000 / 1000
    audioRef.current.play()
    setCurrentTime(duration * value / 1000)
    setIsPlaying(!audioRef.current.paused)
    setIsChaning(false)
  }, [duration])

  return (
    <StyleWrapper className="sprite_playbar">
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
                  ? <NavLink
                    to={`/song?id=${r_currentSong.id}`}
                    title={r_currentSong.name}
                    className="song-name">{r_currentSong.name}</NavLink>
                  : null
              }
              {
                Object.keys(r_currentSong).length > 0
                  ? r_currentSong.ar.map(item => {
                    return (
                      <NavLink key={item.id}
                        to={`/artist?id=${item.id}`}
                        title={item.name}
                        className="singer-name">{item.name}</NavLink>
                    )
                  })
                  : null
              }
            </div>
            <div className="progress">
              <Slider max={1000}
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
            <button className="sprite_playbar btn volume"></button>
            <button
              className={`sprite_playbar btn ${playModeClass}`}
              title={playModeTitle}
              onClick={handleChangePlayMode}></button>
            <button className="sprite_playbar btn playlist" title="播放列表">11</button>
          </div>
        </StyleOperator>
      </StyleContent>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </StyleWrapper>
  )
})
