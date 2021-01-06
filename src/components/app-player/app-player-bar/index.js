import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  getUrlWithSize,
  formatDate
} from '@/utils/format-utils'

// import {
//   throttle
// } from '@/utils/performance'

import { getCurrentSongAction } from '../store/acitonCreators'

import { NavLink } from 'react-router-dom'

import { Slider } from 'antd'

import {
  StyleWrapper,
  StyleContent,
  StyleControl,
  StyleDetail,
  StyleOperator
} from './style'

const getPlayModeObject = mode => {
  const obj = {
    pos: '',
    hoverPos: '',
    title: ''
  }
  switch (mode) {
    case 0:
      obj.pos = '-66px -248px'
      obj.hoverPos = '-93px -248px'
      obj.title = '随机'
      break
    case 1:
      obj.pos = '-66px -344px'
      obj.hoverPos = '-93px -344px'
      obj.title = '单曲循环'
      break
    default:
      obj.pos = '-3px -344px'
      obj.hoverPos = '-33px -344px'
      obj.title = '循环'
  }
  return obj
}

const playMode = getPlayModeObject(3)

export default memo(function AppPlayerBar() {

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progessValue, setProgessValue] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isChanging, setIsChaning] = useState(false)

  const storeState = useSelector(state => ({
    currentSong: state.getIn(['player', 'currentSong'])
  }), shallowEqual)

  const dispatch = useDispatch()

  const audioRef = useRef()

  useEffect(() => {
    dispatch(getCurrentSongAction(1804879213))
  }, [dispatch])

  useEffect(() => {
    async function playMusic() {
      audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${storeState.currentSong.id}.mp3`
      await audioRef.current.play().catch(() => { audioRef.current.pause() })
      setDuration(storeState.currentSong.dt)
      setCurrentTime(0)
      setProgessValue(0)
      setIsPlaying(!audioRef.current.paused)
      setIsChaning(false)
    }
    playMusic()
  }, [storeState.currentSong])

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    setIsPlaying(!audioRef.current.paused)
  }

  // const handleTimeUpdate = throttle(e => {
  //   setCurrentTime(e.target.currentTime * 1000)
  // }, 1000)

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
            <NavLink to={`/song?id=${storeState.currentSong.id}`}>
              {
                Object.keys(storeState.currentSong).length > 0 && storeState.currentSong.al
                  ? <img src={getUrlWithSize(storeState.currentSong.al.picUrl, 34)} alt="" />
                  : <img src={require('@/assets/img/default_album.jpg').default} alt="" />
              }
              <div className="sprite_playbar mask"></div>
            </NavLink>
          </div>
          <div className="info">
            <div className="text">
              {
                Object.keys(storeState.currentSong).length > 0
                  ? <NavLink
                    to={`/song?id=${storeState.currentSong.id}`}
                    title={storeState.currentSong.name}
                    className="song-name">{storeState.currentSong.name}</NavLink>
                  : null
              }
              {
                Object.keys(storeState.currentSong).length > 0 && storeState.currentSong.ar.length > 0
                  ? storeState.currentSong.ar.map(item => {
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
