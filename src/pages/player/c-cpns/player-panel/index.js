import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import ScrollContainer from '@/components/scroll-container'
import ScrollBar from '@/components/scroll-bar'

import PanelHeader from './c-cpns/panel-header'
import PlayList from './c-cpns/play-list'
import LyricDisplay from './c-cpns/lyric-display'

import { StyledWrapper } from './style'

export default memo(function PlayerPanel(props) {

  /**
   * props and state
   */
  const { isShowPanel, onCloseClick } = props

  const [gripSize_pl, setGripSize_pl] = useState(0)
  const [gripSize_ld, setGripSize_ld] = useState(0)

  /**
   * redux hooks
   */
  const {
    r_songList,
    r_lyricList,
    r_currentIndex,
    r_currentRow
  } = useSelector(state => ({
    r_songList: state.getIn(['player', 'songList']),
    r_lyricList: state.getIn(['player', 'lyricList']),
    r_currentIndex: state.getIn(['player', 'currentIndex']),
    r_currentRow: state.getIn(['player', 'currentRow'])
  }), shallowEqual)

  const currentSong = r_songList && r_songList[r_currentIndex]
  const currentLyric = r_lyricList && r_lyricList[r_currentIndex]

  /**
   * other hooks
   */
  const playListRef_scorll = useRef()
  const lyricDisplayRef_scroll = useRef()
  const playListRef_bar = useRef()
  const lyricDisplayRef_bar = useRef()
  const lyricDisplayRef = useRef()

  useEffect(() => {
    playListRef_scorll.current.scrollUpdate()
    const wrapperHeight = playListRef_scorll.current.wrapperEl.clientHeight
    const contentHeight = playListRef_scorll.current.contentEl.offsetHeight
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
    lyricDisplayRef_scroll.current.scrollUpdate()
    const wrapperHeight = lyricDisplayRef_scroll.current.wrapperEl.clientHeight
    const contentHeight = lyricDisplayRef_scroll.current.contentEl.offsetHeight
    if (wrapperHeight >= contentHeight) {
      setGripSize_ld(0)
    } else {
      let size1 = wrapperHeight / contentHeight * wrapperHeight
      let size2 = wrapperHeight / 10
      let gripSize = size1 >= size2 ? size1 : size2
      setGripSize_ld(gripSize)
    }
  }, [currentLyric])

  useEffect(() => {
    if (r_currentRow < 0) {
      lyricDisplayRef_scroll.current.scrollToByTop(0, 0, 0)
      lyricDisplayRef_bar.current.scrollToByTop(0, 0, 0)
    } else {
      const wrapperHeight = lyricDisplayRef_scroll.current.wrapperEl.clientHeight
      const lyricArray = lyricDisplayRef.current.children
      const itemHeight = lyricArray[r_currentRow].offsetHeight
      const itemTop = lyricArray[r_currentRow].offsetTop
      const targetTop = itemTop * -1 + wrapperHeight / 2 - itemHeight / 2
      const targetPercent = (r_currentRow + 1) / lyricArray.length
      lyricDisplayRef_scroll.current.scrollToByTop(targetTop, 600, 30)
      lyricDisplayRef_bar.current.scrollToByPercent(targetPercent, 0, 0)
    }
  }, [r_currentRow])

  /**
   * other logic
   */
  const handleWheel_pl = useCallback((top, percent) => {
    playListRef_bar.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleWheel_ld = useCallback((top, percent) => {
    lyricDisplayRef_bar.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleDrag_pl = useCallback((top, percent) => {
    playListRef_scorll.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleDrag_ld = useCallback((top, percent) => {
    lyricDisplayRef_scroll.current.scrollToByPercent(percent, 0, 0)
  }, [])

  return (
    <StyledWrapper className="cpn-player-panel" style={{ visibility: isShowPanel ? 'visible' : 'hidden' }} >
      <PanelHeader songCount={r_songList.length} songName={currentSong && currentSong.name} onCloseClick={onCloseClick} />
      <div className="content">
        <div className="left">
          <ScrollContainer ref={playListRef_scorll} delta={55} onWheel={handleWheel_pl}>
            <PlayList songList={r_songList} currentIndex={r_currentIndex} />
          </ScrollContainer>
          <ScrollBar ref={playListRef_bar} gripSize={gripSize_pl} onDrag={handleDrag_pl} />
        </div>
        <div className="right">
          <ScrollContainer ref={lyricDisplayRef_scroll} delta={45} onWheel={handleWheel_ld}>
            <LyricDisplay ref={lyricDisplayRef} currentLyric={currentLyric} currentRow={r_currentRow} />
          </ScrollContainer>
          <ScrollBar ref={lyricDisplayRef_bar} gripSize={gripSize_ld} onDrag={handleDrag_ld} />
        </div>
      </div>
    </StyledWrapper>
  )
})
