import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import ScrollContainer from '@/components/scroll-container'
import ScrollBar from '@/components/scroll-bar'

import PanelHeader from './c-cpns/panel-header'
import PlayList from './c-cpns/play-list'
import LyricDisplay from './c-cpns/lyric-display'

import {
  StyledWrapper,
  StyledContent,
  StyledLeft,
  StyledRight
} from './style'

export default memo(function PlayerPanel(props) {

  /**
   * props and state
   */
  const { isShowPanel, handleCloseClick } = props

  const [plSbSize, setPlSbSize] = useState(0)
  const [ldSbsize, setLdSbsize] = useState(0)

  /**
   * redux hooks
   */
  const {
    songList: r_songList,
    currentSong: r_currentSong,
    currentSongIndex: r_currentSongIndex,
    currentLyric: r_currentLyric,
    currentLyricIndex: r_currentLyricIndex
  } = useSelector(state => ({
    songList: state.getIn(['player', 'songList']),
    currentSong: state.getIn(['player', 'currentSong']),
    currentSongIndex: state.getIn(['player', 'currentSongIndex']),
    currentLyric: state.getIn(['player', 'currentLyric']),
    currentLyricIndex: state.getIn(['player', 'currentLyricIndex'])
  }), shallowEqual)

  /**
   * other hooks
   */
  const plScrollRef = useRef()
  const ldScrollRef = useRef()
  const plScrollBarRef = useRef()
  const ldScrollBarRef = useRef()
  const lyricRef = useRef()

  useEffect(() => {
    const wrapperHeight = plScrollRef.current.wrapperEl.clientHeight
    const contentHeight = plScrollRef.current.contentEl.offsetHeight
    if (wrapperHeight >= contentHeight) {
      setPlSbSize(0)
    } else {
      setPlSbSize((wrapperHeight / contentHeight * wrapperHeight))
    }
    plScrollRef.current.scrollUpdate()
  }, [r_songList])

  useEffect(() => {
    const wrapperHeight = ldScrollRef.current.wrapperEl.clientHeight
    const contentHeight = ldScrollRef.current.contentEl.offsetHeight
    if (wrapperHeight >= contentHeight) {
      setLdSbsize(0)
    } else {
      setLdSbsize((wrapperHeight / contentHeight * wrapperHeight))
    }
    ldScrollRef.current.scrollUpdate()
  }, [r_currentLyric])

  useEffect(() => {
    if (r_currentLyricIndex < 0) {
      ldScrollRef.current.scrollToByTop(0, 0, 0)
    } else {
      const wrapperHeight = ldScrollRef.current.wrapperEl.clientHeight
      const perHeight = lyricRef.current.children[r_currentLyricIndex].offsetHeight
      const perTop = lyricRef.current.children[r_currentLyricIndex].offsetTop
      const targetTop = perTop * -1 + wrapperHeight / 2 - perHeight / 2
      ldScrollRef.current.scrollToByTop(targetTop, 600, 30)
    }
  }, [r_currentLyricIndex])

  /**
   * other logic
   */
  const handlePlDrag = useCallback((top, percent) => {
    plScrollRef.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleLdDrag = useCallback((top, percent) => {
    ldScrollRef.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handlePlWheel = useCallback((top, percent) => {
    plScrollBarRef.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleLdWheel = useCallback((top, percent) => {
    ldScrollBarRef.current.scrollToByPercent(percent, 0, 0)
  }, [])

  return (
    <StyledWrapper style={{ visibility: isShowPanel ? 'visible' : 'hidden' }}>
      <PanelHeader songList={r_songList} currentSong={r_currentSong} handleCloseClick={handleCloseClick} />
      <StyledContent>
        <StyledLeft>
          <ScrollContainer ref={plScrollRef} delta={55} onWheel={handlePlWheel}>
            <PlayList songList={r_songList} currentSongIndex={r_currentSongIndex} />
          </ScrollContainer>
          <ScrollBar ref={plScrollBarRef} gripSize={plSbSize} onDrag={handlePlDrag} />
        </StyledLeft>
        <StyledRight>
          <ScrollContainer ref={ldScrollRef} delta={45} onWheel={handleLdWheel}>
            <LyricDisplay ref={lyricRef} currentLyric={r_currentLyric} currentLyricIndex={r_currentLyricIndex} />
          </ScrollContainer>
          <ScrollBar ref={ldScrollBarRef} gripSize={ldSbsize} onDrag={handleLdDrag} />
        </StyledRight>
      </StyledContent>
    </StyledWrapper>
  )
})
