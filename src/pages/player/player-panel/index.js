import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from '../store/acitonCreators'

import ScrollContainer from '@/components/scroll-container'
import ScrollBar from '@/components/scroll-bar'

import PlayerHeader from './c-cpns/player-header'
import PlayerList from './c-cpns/player-list'
import PlayerLyric from './c-cpns/player-lyric'

import { StyledWrapper } from './style'

export default memo(function PlayerPanel(props) {

  /**
   * props and state
   */
  const { setIsShowPanel } = props

  const [gripSize_list, setGripSize_list] = useState(0)
  const [gripSize_lyric, setGripSize_lyric] = useState(0)

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

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const conRef_list = useRef()
  const conRef_lyric = useRef()
  const barRef_list = useRef()
  const barRef_lyric = useRef()
  const lyricRef = useRef()

  useEffect(() => {
    conRef_list.current.scrollUpdate()
    const wrapperHeight = conRef_list.current.wrapperEl.clientHeight
    const contentHeight = conRef_list.current.contentEl.offsetHeight
    if (wrapperHeight >= contentHeight) {
      setGripSize_list(0)
    } else {
      let size1 = wrapperHeight / contentHeight * wrapperHeight
      let size2 = wrapperHeight / 10
      let gripSize = size1 >= size2 ? size1 : size2
      setGripSize_list(gripSize)
    }
  }, [r_songList])

  useEffect(() => {
    conRef_lyric.current.scrollUpdate()
    const wrapperHeight = conRef_lyric.current.wrapperEl.clientHeight
    const contentHeight = conRef_lyric.current.contentEl.offsetHeight
    if (wrapperHeight >= contentHeight) {
      setGripSize_lyric(0)
    } else {
      let size1 = wrapperHeight / contentHeight * wrapperHeight
      let size2 = wrapperHeight / 10
      let gripSize = size1 >= size2 ? size1 : size2
      setGripSize_lyric(gripSize)
    }
  }, [currentLyric])

  useEffect(() => {
    if (r_currentRow < 0) {
      conRef_lyric.current.scrollToByTop(0, 0, 0)
      barRef_lyric.current.scrollToByTop(0, 0, 0)
    } else {
      const wrapperHeight = conRef_lyric.current.wrapperEl.clientHeight
      const lyricArray = lyricRef.current.children
      const itemHeight = lyricArray[r_currentRow].offsetHeight
      const itemTop = lyricArray[r_currentRow].offsetTop
      const targetTop = itemTop * -1 + wrapperHeight / 2 - itemHeight / 2
      const targetPercent = (r_currentRow + 1) / lyricArray.length
      conRef_lyric.current.scrollToByTop(targetTop, 600, 30)
      barRef_lyric.current.scrollToByPercent(targetPercent, 0, 0)
    }
  }, [r_currentRow])

  /**
   * other logic
   */
  const handleWheel_list = useCallback((top, percent) => {
    barRef_list.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleWheel_lyric = useCallback((top, percent) => {
    barRef_lyric.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleDrag_list = useCallback((top, percent) => {
    conRef_list.current.scrollToByPercent(percent, 0, 0)
  }, [])

  const handleDrag_lyric = useCallback((top, percent) => {
    conRef_lyric.current.scrollToByPercent(percent, 0, 0)
  }, [])

  return (
    <StyledWrapper className="cpn-player-panel">
      <PlayerHeader dispatch={dispatch} actions={actions} songList={r_songList} currentSong={currentSong} setIsShowPanel={setIsShowPanel} />
      <div className="content">
        <div className="left">
          <ScrollContainer ref={conRef_list} delta={55} onWheel={handleWheel_list}>
            <PlayerList dispatch={dispatch} actions={actions} songList={r_songList} currentIndex={r_currentIndex} />
          </ScrollContainer>
          <ScrollBar ref={barRef_list} gripSize={gripSize_list} onDrag={handleDrag_list} />
        </div>
        <div className="right">
          <ScrollContainer ref={conRef_lyric} delta={45} onWheel={handleWheel_lyric}>
            <PlayerLyric ref={lyricRef} currentLyric={currentLyric} currentRow={r_currentRow} />
          </ScrollContainer>
          <ScrollBar ref={barRef_lyric} gripSize={gripSize_lyric} onDrag={handleDrag_lyric} />
        </div>
      </div>
    </StyledWrapper>
  )
})
