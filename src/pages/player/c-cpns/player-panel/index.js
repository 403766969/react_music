import React, { memo, useRef, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import ScrollContainer from '@/components/scroll-container'

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

  useEffect(() => {
    plScrollRef.current.scrollUpdate()
  }, [r_songList])

  useEffect(() => {
    if (r_currentLyricIndex < 3) {
      ldScrollRef.current.scrollTo(0, 600, 30)
    } else {
      ldScrollRef.current.scrollTo((r_currentLyricIndex - 3) * 32, 600, 30)
    }
  }, [r_currentLyricIndex])

  return (
    <StyledWrapper style={{ display: isShowPanel ? 'block' : 'none' }}>
      <PanelHeader songList={r_songList} currentSong={r_currentSong} handleCloseClick={handleCloseClick} />
      <StyledContent>
        <StyledLeft>
          <ScrollContainer delta={55} ref={plScrollRef}>
            <PlayList songList={r_songList} currentSongIndex={r_currentSongIndex} />
          </ScrollContainer>
        </StyledLeft>
        <StyledRight>
          <ScrollContainer delta={45} ref={ldScrollRef}>
            <LyricDisplay currentLyric={r_currentLyric} currentLyricIndex={r_currentLyricIndex} />
          </ScrollContainer>
        </StyledRight>
      </StyledContent>
    </StyledWrapper>
  )
})