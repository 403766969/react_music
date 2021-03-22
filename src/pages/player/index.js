import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as actions from './store/actionCreators'

import PlayerBar from './player-bar'
import PlayerPanel from './player-panel'

import { StyledWrapper } from './style'

export default memo(function Player() {

  /**
   * props and state
   */
  const [isLocked, setIsLocked] = useState(() => {
    const s_locked = window.localStorage.getItem('locked')
    return s_locked ? Number(s_locked) === 1 : false
  })
  const [isShowPanel, setIsShowPanel] = useState(false)

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other hooks
   */
  // 初始化播放列表
  useEffect(() => {
    const s_songList = window.localStorage.getItem('songList')
    const s_currentIndex = window.localStorage.getItem('currentIndex')
    const songList = s_songList ? JSON.parse(s_songList) : []
    const currentIndex = s_currentIndex ? parseInt(JSON.parse(s_currentIndex)) : -1
    if (songList.length > 0) {
      dispatch(actions.set_songList(songList))
    }
    if (songList[currentIndex]) {
      dispatch(actions.toggle_song(currentIndex))
    }
  }, [dispatch])

  /**
   * other logic
   */
  //锁定播放器
  const handleLockClick = () => {
    if (!isLocked) {
      window.localStorage.setItem('locked', 1)
    } else {
      window.localStorage.setItem('locked', 0)
    }
    setIsLocked(!isLocked)
  }

  return (
    <StyledWrapper className={`page-player sprite_playbar ${(isShowPanel || isLocked) ? 'show' : ''}`}>
      <PlayerBar setIsShowPanel={setIsShowPanel} />
      <div className="player-panel-wrapper" style={{ visibility: isShowPanel ? 'visible' : 'hidden' }}>
        <PlayerPanel setIsShowPanel={setIsShowPanel} />
      </div>
      <div className="player-lock sprite_playbar">
        <i
          className={`icon-lock sprite_playbar ${isLocked ? 'locked' : ''}`}
          title={`${isLocked ? '解锁' : '锁定'}`}
          onClick={handleLockClick}></i>
      </div>
    </StyledWrapper>
  )
})
