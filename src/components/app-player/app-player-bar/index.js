import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  formatUrlWithSize,
  formatDate
} from '@/utils/formatter'

import { action_get_currentSong } from '../store/acitonCreators'

import { NavLink } from 'react-router-dom'

import { Slider } from 'antd'

import {
  StyleWrapper,
  StyleContent,
  StyleControl,
  StyleDetail,
  StyleOperator
} from './style'

const getPlayMode = mode => {
  const playMode = {
    pos: '',
    hoverPos: '',
    title: ''
  }
  switch (mode) {
    case 0:
      playMode.pos = '-66px -248px'
      playMode.hoverPos = '-93px -248px'
      playMode.title = '随机'
      break
    case 1:
      playMode.pos = '-66px -344px'
      playMode.hoverPos = '-93px -344px'
      playMode.title = '单曲循环'
      break
    default:
      playMode.pos = '-3px -344px'
      playMode.hoverPos = '-33px -344px'
      playMode.title = '循环'
  }
  return playMode
}

const playMode = getPlayMode(3)

export default memo(function AppPlayerBar() {

  /**
   * props and state
   */
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progessValue, setProgessValue] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isChanging, setIsChaning] = useState(false)

  /**
   * redux hooks
   */
  const { currentSong: r_currentSong } = useSelector(state => ({
    currentSong: state.getIn(['player', 'currentSong'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const audioRef = useRef()

  useEffect(() => {
    dispatch(action_get_currentSong(1443714479))
  }, [dispatch])

  useEffect(() => {
    async function playMusic() {
      audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${r_currentSong.id}.mp3`
      await audioRef.current.play().catch(() => { audioRef.current.pause() })
      setDuration(r_currentSong.dt)
      setCurrentTime(0)
      setProgessValue(0)
      setIsPlaying(!audioRef.current.paused)
      setIsChaning(false)
    }
    playMusic()
  }, [r_currentSong])

  /**
   * other logic
   */
  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    setIsPlaying(!audioRef.current.paused)
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
          <button className="sprite_playbar btn prev" title="上一首(ctrl+←)"></button>
          <button className="sprite_playbar btn play" title="播放/暂停(p)" onClick={handlePlayPause}></button>
          <button className="sprite_playbar btn next" title="下一首(ctrl+→)"></button>
        </StyleControl>
        <StyleDetail>
          <div className="image">
            <NavLink to={`/song?id=${r_currentSong.id}`}>
              {
                Object.keys(r_currentSong).length > 0 && r_currentSong.al
                  ? <img src={formatUrlWithSize(r_currentSong.al.picUrl, 34)} alt="" />
                  : <img src={require('@/assets/img/default_album.jpg').default} alt="" />
              }
              <div className="sprite_playbar mask"></div>
            </NavLink>
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
                Object.keys(r_currentSong).length > 0 && r_currentSong.ar.length > 0
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
                onAfterChange={handleAfterSliderChange} />
              <div className="time">
                <span className="now-time">{formatDate(currentTime, 'mm:ss')}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatDate(duration, 'mm:ss')}</span>
              </div>
            </div>
          </div>
        </StyleDetail>
        <StyleOperator pos={playMode.pos} hoverPos={playMode.hoverPos}>
          <div className="left">
            <button className="sprite_playbar btn favor" title="收藏"></button>
            <button className="sprite_playbar btn share" title="分享"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop" title={playMode.title}></button>
            <button className="sprite_playbar btn playlist" title="播放列表">11</button>
          </div>
        </StyleOperator>
      </StyleContent>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </StyleWrapper>
  )
})
