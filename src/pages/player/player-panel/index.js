import React, { memo, useRef, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from '../store/actionCreators'

import ScrollArea from '@/components/scroll-area'

import PlayerHeader from './c-cpns/player-header'
import PlayerList from './c-cpns/player-list'
import PlayerLyric from './c-cpns/player-lyric'

import { StyledWrapper } from './style'

export default memo(function PlayerPanel(props) {

  /**
   * props and state
   */
  const { setIsShowPanel } = props

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
  const lyricRef = useRef()
  const scrollAreaRef = useRef()

  useEffect(() => {
    if (r_currentRow < 0) {
      scrollAreaRef.current.scrollToByPrecent(0, 0)
    } else {
      const lyricArray = lyricRef.current.children
      const itemHeight = lyricArray[r_currentRow].offsetHeight
      const itemTop = lyricArray[r_currentRow].offsetTop
      const targetTop = (itemTop + itemHeight / 2 - 109) * -1
      scrollAreaRef.current.scrollToByContentTop(targetTop, 0.6)
    }
  }, [r_currentRow])

  return (
    <StyledWrapper className="cpn-player-panel">
      <PlayerHeader dispatch={dispatch} actions={actions} songList={r_songList} currentSong={currentSong} setIsShowPanel={setIsShowPanel} />
      <div className="content">
        <div className="left">
          <ScrollArea wheelOffset={55} updateTrigger={r_songList}>
            <PlayerList dispatch={dispatch} actions={actions} songList={r_songList} currentIndex={r_currentIndex} />
          </ScrollArea>
        </div>
        <div className="right">
          <ScrollArea wheelOffset={45} updateTrigger={currentLyric} ref={scrollAreaRef}>
            <PlayerLyric currentLyric={currentLyric} currentRow={r_currentRow} ref={lyricRef} />
          </ScrollArea>
        </div>
      </div>
    </StyledWrapper>
  )
})
