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

  const [plSbValue, setPlSbValue] = useState(0)
  const [ldSbValue, setLdSbValue] = useState(0)

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
  const lyricRef = useRef()

  useEffect(() => {
    plScrollRef.current.scrollUpdate()
  }, [r_songList])

  useEffect(() => {
    if (r_currentLyricIndex < 0) {
      ldScrollRef.current.scrollTo(0, 600, 30)
    } else {
      const height = lyricRef.current.children[r_currentLyricIndex].offsetHeight
      let to = lyricRef.current.children[r_currentLyricIndex].offsetTop + height / 2 - 109
      if (to < 0) {
        to = 0
      }
      ldScrollRef.current.scrollTo(to, 600, 30)
    }
  }, [r_currentLyricIndex])

  /**
   * other logic
   */
  const handlePlChange = useCallback(value => {
    plScrollRef.current.scrollTo(2484 * value, 0, 0)
    setPlSbValue(value)
  }, [])

  const handleLdChange = useCallback(value => {
    ldScrollRef.current.scrollTo(1888 * value, 0, 0)
    setLdSbValue(value)
  }, [])

  return (
    <StyledWrapper style={{ visibility: isShowPanel ? 'visible' : 'hidden' }}>
      <PanelHeader songList={r_songList} currentSong={r_currentSong} handleCloseClick={handleCloseClick} />
      <StyledContent>
        <StyledLeft>
          <ScrollContainer delta={55} ref={plScrollRef}>
            <PlayList songList={r_songList} currentSongIndex={r_currentSongIndex} />
          </ScrollContainer>
          <ScrollBar value={plSbValue} onChange={handlePlChange} />
        </StyledLeft>
        <StyledRight>
          <ScrollContainer delta={45} ref={ldScrollRef}>
            <LyricDisplay currentLyric={r_currentLyric} currentLyricIndex={r_currentLyricIndex} ref={lyricRef} />
          </ScrollContainer>
          <ScrollBar value={ldSbValue} onChange={handleLdChange} />
        </StyledRight>
      </StyledContent>
    </StyledWrapper>
  )
})
