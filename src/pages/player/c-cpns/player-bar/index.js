import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { playModeTypes, audioStatusTypes } from '@/common/constants'

import { formatUrlWithSize, formatDate } from '@/utils/formatter'

import * as actions from '../../store/acitonCreators'

import { NavLink } from 'react-router-dom'

import { Slider } from 'antd'

import ArtistDivide from '@/components/artist-divide'

import PlayerPanel from '../player-panel'
import PlayerMessage from '../player-message'

import { StyleWrapper, StyleContent, StyleControl, StyleDetail, StyleOperator, StyleLock } from './style'

export default memo(function PlayerBar() {

  /**
   * props and state
   */
  const [volume, setVolume] = useState(() => {
    const s_volume = window.localStorage.getItem('volume')
    return s_volume ? Number(s_volume) : 50
  })
  const [playMode, setPlayMode] = useState(() => {
    const s_playMode = window.localStorage.getItem('playMode')
    return s_playMode || playModeTypes.LIST_LOOP
  })
  const [isLocked, setIsLocked] = useState(() => {
    const s_lock = window.localStorage.getItem('lock')
    return s_lock ? Number(s_lock) === 1 : false
  })
  const [isShowVolume, setIsShowVolume] = useState(false)
  const [isShowPanel, setIsShowPanel] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progessValue, setProgessValue] = useState(0)

  const [playerId, setPlayerId] = useState(null)

  /**
   * redux hooks
   */
  const {
    r_songList,
    r_lyricList,
    r_currentIndex,
    r_currentRow,
    r_audioStatus
  } = useSelector(state => ({
    r_songList: state.getIn(['player', 'songList']),
    r_lyricList: state.getIn(['player', 'lyricList']),
    r_currentIndex: state.getIn(['player', 'currentIndex']),
    r_currentRow: state.getIn(['player', 'currentRow']),
    r_audioStatus: state.getIn(['player', 'audioStatus'])
  }), shallowEqual)

  const currentSong = r_songList[r_currentIndex]

  const currentLyric = r_lyricList[r_currentIndex]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.init_store())
  }, [dispatch])

  /**
   * audio logic
   */
  // audio dom
  const audioRef = useRef()

  // 暂停
  const audioPause = useCallback(() => {
    audioRef.current.pause()
    dispatch(actions.set_audioStatus(audioStatusTypes.AUDIO_PAUSE))
  }, [dispatch])

  // 播放
  const audioPlay = useCallback(() => {
    audioRef.current.play()
      .then(() => {
        const newPlayerId = new Date().getTime().toString()
        window.localStorage.setItem('playerId', newPlayerId)
        setPlayerId(newPlayerId)
        dispatch(actions.set_audioStatus(audioStatusTypes.AUDIO_PLAY))
      })
      .catch(() => {
        audioPause()
      })
  }, [dispatch, audioPause])

  // 归零
  const backZero = useCallback(() => {
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    setProgessValue(0)
  }, [])

  // 当前歌曲改变时
  useEffect(() => {
    setPlayerId(window.localStorage.getItem('playerId'))
    audioPause()
    backZero()
    if (currentSong) {
      audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`
      setDuration(currentSong.dt)
      audioPlay()
    } else {
      audioRef.current.src = ''
      setDuration(0)
      dispatch(actions.set_audioStatus(audioStatusTypes.AUDIO_IDLE))
    }
  }, [dispatch, audioPause, audioPlay, backZero, currentSong])

  /**
   * 控制器
   */
  // 播放/暂停
  const handlePlayPause = () => {
    if (!currentSong) {
      return
    }
    if (audioRef.current.paused) {
      audioPlay()
    } else {
      audioPause()
    }
  }

  // 根据播放模式计算下一首歌曲
  const getNextIndex = offset => {
    const songCount = r_songList.length
    let nextIndex = r_currentIndex
    switch (playMode) {
      case playModeTypes.LIST_LOOP:
        nextIndex = nextIndex + offset
        if (nextIndex < 0) {
          nextIndex = songCount - 1
        } else if (nextIndex > songCount - 1) {
          nextIndex = 0
        }
        break
      case playModeTypes.RANDOM_PLAY:
        while (nextIndex === r_currentIndex) {
          nextIndex = Math.floor(Math.random() * songCount)
        }
        break
      default:
        break
    }
    return nextIndex
  }

  // 上一首/下一首
  const handleSongToggle = offset => {
    const songCount = r_songList.length
    if (songCount <= 0) {
      return
    } else if (songCount === 1) {
      dispatch(actions.toggle_song(0))
    } else if (songCount > 1) {
      const nextIndex = getNextIndex(offset)
      dispatch(actions.toggle_song(nextIndex))
    }
  }

  /**
   * 音量
   */
  // 初始化音量
  useEffect(() => {
    setVolume(volume => {
      audioRef.current.volume = volume / 100
      return volume
    })
  }, [])

  // 调节音量
  const handleVolumeChange = useCallback(value => {
    setVolume(() => {
      audioRef.current.volume = value / 100
      return value
    })
  }, [])

  // 调节音量完成
  const handleAfterVolumeChange = useCallback(value => {
    window.localStorage.setItem('volume', value)
  }, [])

  /**
   * 播放模式
   */
  // 切换播放模式
  const handlePlayModeToggle = () => {
    let newPlayMode = ''
    switch (playMode) {
      case playModeTypes.LIST_LOOP:
        newPlayMode = playModeTypes.SINGLE_LOOP
        break
      case playModeTypes.SINGLE_LOOP:
        newPlayMode = playModeTypes.RANDOM_PLAY
        break
      case playModeTypes.RANDOM_PLAY:
        newPlayMode = playModeTypes.LIST_LOOP
        break
      default:
        break
    }
    setPlayMode(newPlayMode)
    window.localStorage.setItem('playMode', newPlayMode)
  }

  // 播放模式样式
  let playModeClass = ''
  let playModeTitle = ''
  switch (playMode) {
    case playModeTypes.LIST_LOOP:
      playModeClass = 'list-loop'
      playModeTitle = '列表循环'
      break
    case playModeTypes.SINGLE_LOOP:
      playModeClass = 'single-loop'
      playModeTitle = '单曲循环'
      break
    case playModeTypes.RANDOM_PLAY:
      playModeClass = 'random-play'
      playModeTitle = '随机播放'
      break
    default:
      break
  }

  /**
   * 进度条
   */
  // 拖动进度条
  const handleSliderChange = useCallback(value => {
    setDuration(duration => {
      setIsDragging(true)
      setCurrentTime(duration * value / 100)
      setProgessValue(value)
      return duration
    })
  }, [])

  // 拖动进度条完成
  const handleAfterSliderChange = useCallback(value => {
    setDuration(duration => {
      audioRef.current.currentTime = duration * value / 100 / 1000
      setCurrentTime(duration * value / 100)
      setIsDragging(false)
      return duration
    })
  }, [])

  // 进度条随时间改变
  const handleTimeUpdate = e => {
    const s_playerId = window.localStorage.getItem('playerId')
    if (s_playerId && s_playerId !== playerId) {
      audioPause()
      return
    }

    const audio_currentTime = e.target.currentTime * 1000
    if (!isDragging) {
      setCurrentTime(audio_currentTime)
      setProgessValue(audio_currentTime / duration * 100)
    }

    // 歌词进度
    if (!currentLyric || !currentLyric.lyric || currentLyric.lyric.length <= 0) {
      return
    }

    const lastRow = currentLyric.lyric.length - 1
    if (audio_currentTime >= currentLyric.lyric[lastRow].time) {
      if (lastRow !== r_currentRow) {
        dispatch(actions.set_currentRow(lastRow))
      }
      return
    }

    let nextRow = -1
    for (let i = 0; i <= lastRow; i++) {
      if (audio_currentTime < currentLyric.lyric[i].time) {
        nextRow = i - 1
        break
      }
    }
    if (nextRow !== r_currentRow) {
      dispatch(actions.set_currentRow(nextRow))
    }
  }

  // 播放结束
  const handleEnded = () => {
    audioPause()
    if (playMode === playModeTypes.SINGLE_LOOP) {
      backZero()
      audioPlay()
    } else {
      handleSongToggle(1)
    }
  }

  /**
   * 显示隐藏
   */
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
        <StyleControl isPlaying={r_audioStatus === audioStatusTypes.AUDIO_PLAY}>
          <button className="sprite_playbar btn prev" title="上一首(ctrl+←)" onClick={() => handleSongToggle(-1)}></button>
          <button className="sprite_playbar btn play" title="播放/暂停(p)" onClick={handlePlayPause}></button>
          <button className="sprite_playbar btn next" title="下一首(ctrl+→)" onClick={() => handleSongToggle(1)}></button>
        </StyleControl>
        <StyleDetail>
          <div className="image">
            {
              currentSong
                ? (
                  <NavLink to={`/song?id=${currentSong.id}`}>
                    <img src={formatUrlWithSize(currentSong.al.picUrl, 34)} alt="" />
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
                currentSong && (
                  <div className="song text-nowrap">
                    <NavLink
                      to={`/song?id=${currentSong.id}`}
                      title={currentSong.name}>{currentSong.name}</NavLink>
                  </div>
                )
              }
              {
                currentSong && (
                  <div className="artists text-nowrap">
                    <ArtistDivide artistList={currentSong.ar} />
                  </div>
                )
              }
            </div>
            <div className="progress">
              <Slider
                step={0.1}
                tipFormatter={null}
                value={progessValue}
                onChange={handleSliderChange}
                onAfterChange={handleAfterSliderChange}
                disabled={currentSong === undefined || currentSong === null} />
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
            <button className="sprite_playbar btn volume" title="音量" onClick={() => setIsShowVolume(!isShowVolume)}>
              <div className={`sprite_playbar volume-bar ${isShowVolume ? '' : 'hidden'}`} onClick={e => e.stopPropagation()}>
                <Slider value={volume} onChange={handleVolumeChange} onAfterChange={handleAfterVolumeChange} vertical />
              </div>
            </button>
            <button
              className={`sprite_playbar btn ${playModeClass}`}
              title={playModeTitle}
              onClick={handlePlayModeToggle}></button>
            <button
              className="sprite_playbar btn playlist"
              title="播放列表"
              onClick={() => setIsShowPanel(!isShowPanel)}>{r_songList.length <= 99 ? r_songList.length : '99+'}</button>
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
      <PlayerPanel isShowPanel={isShowPanel} onCloseClick={handleCloseClick} />
      <PlayerMessage />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
    </StyleWrapper>
  )
})
