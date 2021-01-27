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

  const [ldSbValue, setLdSbValue] = useState(0)
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
  const lyricRef = useRef()

  useEffect(() => {
    const wrapperHeight = plScrollRef.current.wrapperEl.clientHeight
    const contentHeight = plScrollRef.current.contentEl.offsetHeight
    plScrollRef.current.scrollUpdate()
    if (wrapperHeight >= contentHeight) {
      setPlSbSize(0)
    } else {
      setPlSbSize((wrapperHeight / contentHeight * wrapperHeight))
    }
  }, [r_songList])

  useEffect(() => {
    const wrapperHeight = ldScrollRef.current.wrapperEl.clientHeight
    const contentHeight = ldScrollRef.current.contentEl.offsetHeight
    ldScrollRef.current.scrollUpdate()
    if (wrapperHeight >= contentHeight) {
      setLdSbsize(0)
    } else {
      setLdSbsize((wrapperHeight / contentHeight * wrapperHeight))
    }
  }, [r_currentLyric])

  useEffect(() => {
    if (r_currentLyricIndex < 0) {
      ldScrollRef.current.scrollTo(0, 0, 0)
      setLdSbValue(0)
    } else {
      const height = lyricRef.current.children[r_currentLyricIndex].offsetHeight
      let to = lyricRef.current.children[r_currentLyricIndex].offsetTop + height / 2 - 109
      if (to < 0) {
        to = 0
      }
      ldScrollRef.current.scrollTo(to, 600, 30)
      const value1 = lyricRef.current.children[r_currentLyricIndex].offsetTop + height
      const value2 = lyricRef.current.offsetHeight
      setLdSbValue(value1 / value2)
    }
  }, [r_currentLyricIndex])

  /**
   * other logic
   */
  const handlePlChange = useCallback((to, percent) => {
    const wrapperHeight = plScrollRef.current.wrapperEl.clientHeight
    const contentHeight = plScrollRef.current.contentEl.offsetHeight
    const scrollHeight = contentHeight - wrapperHeight
    plScrollRef.current.scrollTo(scrollHeight * percent, 0, 0)
  }, [])

  const handleLdChange = useCallback((to, percent) => {
    const wrapperHeight = ldScrollRef.current.wrapperEl.clientHeight
    const contentHeight = ldScrollRef.current.contentEl.offsetHeight
    const scrollHeight = contentHeight - wrapperHeight
    ldScrollRef.current.scrollTo(scrollHeight * percent, 0, 0)
    setLdSbValue(percent)
  }, [])

  const handlePlWheel = useCallback((to, percent) => {
    plScrollBarRef.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleLdWheel = useCallback((to, percent) => {
    setLdSbValue(percent)
  }, [])

  return (
    <StyledWrapper style={{ visibility: isShowPanel ? 'visible' : 'hidden' }}>
      <PanelHeader songList={r_songList} currentSong={r_currentSong} handleCloseClick={handleCloseClick} />
      <StyledContent>
        <StyledLeft>
          <ScrollContainer ref={plScrollRef} delta={55} onWheel={handlePlWheel}>
            <PlayList songList={r_songList} currentSongIndex={r_currentSongIndex} />
          </ScrollContainer>
          <ScrollBar ref={plScrollBarRef} gripSize={plSbSize} onDrag={handlePlChange} />
        </StyledLeft>
        <StyledRight>
          <ScrollContainer ref={ldScrollRef} delta={45} onWheel={handleLdWheel}>
            <LyricDisplay ref={lyricRef} currentLyric={r_currentLyric} currentLyricIndex={r_currentLyricIndex} />
          </ScrollContainer>
          <ScrollBar value={ldSbValue} gripSize={ldSbsize} onDrag={handleLdChange} />
        </StyledRight>
      </StyledContent>
    </StyledWrapper>
  )
})
