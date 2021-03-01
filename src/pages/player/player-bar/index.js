import React, { memo, useRef, useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { audioStatusTypes, playerModeTypes } from '@/common/constants'

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

  const [playerMode, setPlayerMode] = useState(() => {
    const s_playerMode = window.localStorage.getItem('playerMode')
    return s_playerMode || playerModeTypes.LIST_LOOP
  })
  const [currentTime, setCurrentTime] = useState(0)
  const [progessValue, setProgessValue] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [playerId, setPlayerId] = useState(null)

  /**
   * redux hooks
   */
  const {
    r_songList,
    r_lyricList,
    r_currentIndex,
    r_currentRow,
    r_audioStatus,
    r_messageConfig
  } = useSelector(state => ({
    r_songList: state.getIn(['player', 'songList']),
    r_lyricList: state.getIn(['player', 'lyricList']),
    r_currentIndex: state.getIn(['player', 'currentIndex']),
    r_currentRow: state.getIn(['player', 'currentRow']),
    r_audioStatus: state.getIn(['player', 'audioStatus']),
    r_messageConfig: state.getIn(['player', 'messageConfig']),
  }), shallowEqual)

  const currentSong = r_songList && r_songList[r_currentIndex]
  const currentLyric = r_lyricList && r_lyricList[r_currentIndex]

  const dispatch = useDispatch()

  /**
   * audio logic
   */
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
        dispatch(actions.set_audioStatus(audioStatusTypes.AUDIO_PLAY))
        const newPlayerId = new Date().getTime().toString()
        window.localStorage.setItem('playerId', newPlayerId)
        setPlayerId(newPlayerId)
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

  // 根据播放模式计算下一首歌曲
  const getNextIndex = useCallback(offset => {
    const songCount = r_songList.length
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
    return nextIndex
  }, [playerMode, r_currentIndex, r_songList.length])

  // 上一首/下一首
  const songToggle = useCallback(offset => {
    const songCount = r_songList.length
    if (songCount <= 0) {
      return
    } else if (songCount === 1) {
      dispatch(actions.toggle_song(0))
    } else if (songCount > 1) {
      const nextIndex = getNextIndex(offset)
      dispatch(actions.toggle_song(nextIndex))
    }
  }, [dispatch, getNextIndex, r_songList.length])

  // 随播放时间更新进度
  const handleTimeUpdate = e => {
    // 除当前页面之外所有页面停止播放
    const s_playerId = window.localStorage.getItem('playerId')
    if (s_playerId && s_playerId !== playerId) {
      audioPause()
      return
    }
    const duration = (currentSong && currentSong.dt) || 0
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
      backZero()
      audioPlay()
    } else {
      songToggle(1)
    }
  }

  /**
   * other hooks
   */
  // 当前歌曲改变时
  useEffect(() => {
    setPlayerId(window.localStorage.getItem('playerId'))
    audioPause()
    backZero()
    if (currentSong) {
      audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`
      audioPlay()
    } else {
      audioRef.current.src = ''
      dispatch(actions.set_audioStatus(audioStatusTypes.AUDIO_IDLE))
    }
  }, [dispatch, audioPause, audioPlay, backZero, currentSong])

  return (
    <StyledWrapper className="cpn-player-bar">
      <PlayerControl
        audio={audioRef.current}
        audioStatus={r_audioStatus}
        audioPause={audioPause}
        audioPlay={audioPlay}
        songToggle={songToggle} />
      <PlayerContent
        audio={audioRef.current}
        currentSong={currentSong}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        progessValue={progessValue}
        setProgessValue={setProgessValue}
        setIsDragging={setIsDragging} />
      <PlayerOperation
        audio={audioRef.current}
        songList={r_songList}
        playerMode={playerMode}
        setPlayerMode={setPlayerMode}
        setIsShowPanel={setIsShowPanel} />
      <PlayerMessage
        dispatch={dispatch}
        actions={actions}
        messageConfig={r_messageConfig} />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}></audio>
    </StyledWrapper>
  )
})
