import React, { memo, useRef, useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { audioStatusTypes, playerModeTypes, keycodes, playerShortcuts } from '@/common/constants'

import * as actions from '../store/actionCreators'

import PlayerControl from './c-cpns/player-control'
import PlayerContent from './c-cpns/player-content'
import PlayerOperation from './c-cpns/player-operation'
import PlayerMessage from './c-cpns/player-message'

import { StyledWrapper } from './style'

export default memo(function PlayerBar(props) {

  /**
   * props and state
   */
  const { setIsShowPanel } = props

  const [playerId, setPlayerId] = useState(() => {
    const s_playerId = window.localStorage.getItem('playerId')
    return s_playerId || ''
  })
  const [playerMode, setPlayerMode] = useState(() => {
    const s_playerMode = window.localStorage.getItem('playerMode')
    return s_playerMode || playerModeTypes.LIST_LOOP
  })
  const [volume, setVolume] = useState(() => {
    const s_volume = window.localStorage.getItem('volume')
    return s_volume ? Number(s_volume) : 50
  })
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progessValue, setProgessValue] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

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

  const dispatch = useDispatch()

  const currentSong = r_songList && r_songList[r_currentIndex]
  const currentLyric = r_lyricList && r_lyricList[r_currentIndex]

  /**
   * audio
   */
  const audioRef = useRef()

  // 重置
  const audioReset = useCallback(() => {
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    setProgessValue(0)
  }, [])

  // 暂停
  const audioPause = useCallback(() => {
    audioRef.current.pause()
    dispatch(actions.set_audioStatus(audioStatusTypes.AUDIO_PAUSE))
  }, [dispatch])

  // 播放
  const audioPlay = useCallback(() => {
    audioRef.current.play()
      .then(() => {
        const newPlayerId = Date.now().toString()
        setPlayerId(newPlayerId)
        window.localStorage.setItem('playerId', newPlayerId)
        dispatch(actions.set_audioStatus(audioStatusTypes.AUDIO_PLAY))
      })
      .catch(() => {
        audioPause()
      })
  }, [dispatch, audioPause])

  // 切换歌曲
  const songToggle = useCallback(offset => {
    const songCount = (r_songList && r_songList.length) || 0
    if (songCount <= 0) {
      return
    } else if (songCount === 1) {
      dispatch(actions.toggle_song(0))
    } else {
      let nextIndex = r_currentIndex
      switch (playerMode) {
        case playerModeTypes.RANDOM_PLAY:
          while (nextIndex === r_currentIndex) {
            nextIndex = Math.floor(Math.random() * songCount)
          }
          break
        default:
          nextIndex = nextIndex + offset
          if (nextIndex < 0) {
            nextIndex = songCount - 1
          } else if (nextIndex > songCount - 1) {
            nextIndex = 0
          }
          break
      }
      dispatch(actions.toggle_song(nextIndex))
    }
  }, [dispatch, playerMode, r_songList, r_currentIndex])

  // 播放进度
  const handleTimeUpdate = e => {
    // 其他页面停止播放
    const s_playerId = window.localStorage.getItem('playerId')
    if (s_playerId && s_playerId !== playerId) {
      audioPause()
      return
    }
    const audio_currentTime = e.target.currentTime * 1000
    // 时间进度
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
    if (playerMode === playerModeTypes.SINGLE_LOOP) {
      audioReset()
      audioPlay()
    } else {
      songToggle(1)
    }
  }

  /**
   * player control
   */
  // 播放/暂停
  const handlePlayClick = useCallback(() => {
    if (audioRef.current.paused) {
      audioPlay()
    } else {
      audioPause()
    }
  }, [audioPause, audioPlay])

  // 上一首
  const handlePrevClick = useCallback(() => {
    songToggle(-1)
  }, [songToggle])

  // 下一首
  const handleNextClick = useCallback(() => {
    songToggle(1)
  }, [songToggle])

  /**
   * player content
   */
  // 拖动进度条
  const handleSliderChange = useCallback(value => {
    setDuration(dt => {
      setIsDragging(true)
      setCurrentTime(dt * value / 100)
      setProgessValue(value)
      return dt
    })
  }, [])

  // 释放进度条
  const handleSliderAfterChange = useCallback(value => {
    setDuration(dt => {
      audioRef.current.currentTime = dt * value / 100 / 1000
      setCurrentTime(dt * value / 100)
      setIsDragging(false)
      return dt
    })
  }, [])

  /**
   * player operation
   */
  // 切换播放模式
  const handlePlayerModeToggle = useCallback(() => {
    let newPlayerMode = ''
    switch (playerMode) {
      case playerModeTypes.LIST_LOOP:
        newPlayerMode = playerModeTypes.SINGLE_LOOP
        break
      case playerModeTypes.SINGLE_LOOP:
        newPlayerMode = playerModeTypes.RANDOM_PLAY
        break
      case playerModeTypes.RANDOM_PLAY:
        newPlayerMode = playerModeTypes.LIST_LOOP
        break
      default:
        newPlayerMode = playerModeTypes.LIST_LOOP
        break
    }
    setPlayerMode(newPlayerMode)
    window.localStorage.setItem('playerMode', newPlayerMode)
  }, [playerMode])

  // 拖动音量
  const handleVolumeChange = useCallback(value => {
    audioRef.current.volume = value / 100
    setVolume(value)
  }, [])

  // 释放音量
  const handleVolumeAfterChange = useCallback(value => {
    window.localStorage.setItem('volume', value)
  }, [])

  // 显示/隐藏播放列表
  const handleListClick = useCallback(() => {
    setIsShowPanel(isShowPanel => {
      return !isShowPanel
    })
  }, [setIsShowPanel])

  /**
   * other hooks
   */
  // 初始化音量
  useEffect(() => {
    setVolume(volume => {
      audioRef.current.volume = volume / 100
      return volume
    })
  }, [])

  // 当前歌曲改变时
  useEffect(() => {
    audioPause()
    audioReset()
    if (currentSong) {
      audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`
      setDuration(currentSong.dt)
      audioPlay()
    } else {
      audioRef.current.src = ''
      setDuration(0)
    }
  }, [dispatch, audioReset, audioPause, audioPlay, currentSong])

  // 快捷键
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.ctrlKey && playerShortcuts.includes(e.keyCode)) {
        e.preventDefault()
      }
    }
    const handleKeyUp = e => {
      if (e.ctrlKey && playerShortcuts.includes(e.keyCode)) {
        switch (e.keyCode) {
          case keycodes.KEYCODE_M:
            handlePlayerModeToggle()
            break
          case keycodes.KEYCODE_L:
            handleListClick()
            break
          case keycodes.KEYCODE_P:
            handlePlayClick()
            break
          case keycodes.KEYCODE_LEFT:
            handlePrevClick()
            break
          case keycodes.KEYCODE_RIGHT:
            handleNextClick()
            break
          case keycodes.KEYCODE_UP:
            setVolume(volume => {
              let newVolume = ((volume + 10) <= 100) ? (volume + 10) : 100
              audioRef.current.volume = newVolume / 100
              window.localStorage.setItem('volume', newVolume)
              return newVolume
            })
            break
          case keycodes.KEYCODE_DOWN:
            setVolume(volume => {
              let newVolume = ((volume - 10) >= 0) ? (volume - 10) : 0
              audioRef.current.volume = newVolume / 100
              window.localStorage.setItem('volume', newVolume)
              return newVolume
            })
            break
          default:
            break
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handlePlayerModeToggle, handleListClick, handlePlayClick, handlePrevClick, handleNextClick])

  return (
    <StyledWrapper className="cpn-player-bar">
      <PlayerControl
        audioStatus={r_audioStatus}
        handlePlayClick={handlePlayClick}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick} />
      <PlayerContent
        currentSong={currentSong}
        duration={duration}
        currentTime={currentTime}
        progessValue={progessValue}
        handleSliderChange={handleSliderChange}
        handleSliderAfterChange={handleSliderAfterChange} />
      <PlayerOperation
        playerMode={playerMode}
        volume={volume}
        songCount={(r_songList && r_songList.length) || 0}
        handlePlayerModeToggle={handlePlayerModeToggle}
        handleVolumeChange={handleVolumeChange}
        handleVolumeAfterChange={handleVolumeAfterChange}
        handleListClick={handleListClick} />
      <PlayerMessage />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}></audio>
    </StyledWrapper>
  )
})
