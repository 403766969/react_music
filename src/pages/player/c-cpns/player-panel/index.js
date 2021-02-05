import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import ScrollContainer from '@/components/scroll-container'
import ScrollBar from '@/components/scroll-bar'

import PanelHeader from './c-cpns/panel-header'
import PlayList from './c-cpns/play-list'
import LyricDisplay from './c-cpns/lyric-display'

import {
  StyledMask,
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

  const [gripSize_pl, setGripSize_pl] = useState(0)
  const [gripSize_ld, setGripSize_ld] = useState(0)

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
  const scrollContainerRef_pl = useRef()
  const scrollContainerRef_ld = useRef()
  const scrollBarRef_pl = useRef()
  const scrollBarRef_ld = useRef()
  const lyricDisplayRef = useRef()

  useEffect(() => {
    scrollContainerRef_pl.current.scrollUpdate()
    const wrapperHeight = scrollContainerRef_pl.current.wrapperEl.clientHeight
    const contentHeight = scrollContainerRef_pl.current.contentEl.offsetHeight
    if (wrapperHeight >= contentHeight) {
      setGripSize_pl(0)
    } else {
      let size1 = wrapperHeight / contentHeight * wrapperHeight
      let size2 = wrapperHeight / 10
      let gripSize = size1 >= size2 ? size1 : size2
      setGripSize_pl(gripSize)
    }
  }, [r_songList])

  useEffect(() => {
    scrollContainerRef_ld.current.scrollUpdate()
    const wrapperHeight = scrollContainerRef_ld.current.wrapperEl.clientHeight
    const contentHeight = scrollContainerRef_ld.current.contentEl.offsetHeight
    if (wrapperHeight >= contentHeight) {
      setGripSize_ld(0)
    } else {
      let size1 = wrapperHeight / contentHeight * wrapperHeight
      let size2 = wrapperHeight / 10
      let gripSize = size1 >= size2 ? size1 : size2
      setGripSize_ld(gripSize)
    }
  }, [r_currentLyric])

  useEffect(() => {
    if (r_currentLyricIndex < 0) {
      scrollContainerRef_ld.current.scrollToByTop(0, 0, 0)
      scrollBarRef_ld.current.scrollToByTop(0, 0, 0)
    } else {
      const wrapperHeight = scrollContainerRef_ld.current.wrapperEl.clientHeight
      const lyricArray = lyricDisplayRef.current.children
      const itemHeight = lyricArray[r_currentLyricIndex].offsetHeight
      const itemTop = lyricArray[r_currentLyricIndex].offsetTop
      const targetTop = itemTop * -1 + wrapperHeight / 2 - itemHeight / 2
      const targetPercent = (r_currentLyricIndex + 1) / lyricArray.length
      scrollContainerRef_ld.current.scrollToByTop(targetTop, 600, 30)
      scrollBarRef_ld.current.scrollToByPercent(targetPercent, 0, 0)
    }
  }, [r_currentLyricIndex])

  /**
   * other logic
   */
  const handleMaskClick = () => {
    if (handleCloseClick && typeof handleCloseClick === 'function') {
      handleCloseClick()
    }
  }

  const handleWheel_pl = useCallback((top, percent) => {
    scrollBarRef_pl.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleWheel_ld = useCallback((top, percent) => {
    scrollBarRef_ld.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleDrag_pl = useCallback((top, percent) => {
    scrollContainerRef_pl.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleDrag_ld = useCallback((top, percent) => {
    scrollContainerRef_ld.current.scrollToByPercent(percent, 0, 0)
  }, [])

  return (
    <StyledMask style={{ display: isShowPanel ? 'block' : 'none' }} onClick={handleMaskClick}>
      <StyledWrapper onClick={e => e.stopPropagation()}>
        <PanelHeader songList={r_songList} currentSong={r_currentSong} handleCloseClick={handleCloseClick} />
        <StyledContent>
          <StyledLeft>
            <ScrollContainer ref={scrollContainerRef_pl} delta={55} onWheel={handleWheel_pl}>
              <PlayList songList={r_songList} currentSongIndex={r_currentSongIndex} />
            </ScrollContainer>
            <ScrollBar ref={scrollBarRef_pl} gripSize={gripSize_pl} onDrag={handleDrag_pl} />
          </StyledLeft>
          <StyledRight>
            <ScrollContainer ref={scrollContainerRef_ld} delta={45} onWheel={handleWheel_ld}>
              <LyricDisplay ref={lyricDisplayRef} currentLyric={r_currentLyric} currentLyricIndex={r_currentLyricIndex} />
            </ScrollContainer>
            <ScrollBar ref={scrollBarRef_ld} gripSize={gripSize_ld} onDrag={handleDrag_ld} />
          </StyledRight>
        </StyledContent>
      </StyledWrapper>
    </StyledMask>
  )
})
