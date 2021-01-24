import React, { memo, useRef, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import ScrollPanel from '@/components/scroll-panel'

import PanelHeader from './c-cpns/panel-header'
import PanelPlaylist from './c-cpns/panel-playlist'

import {
  StyledWrapper,
  StyledContent,
  StyledLeft,
  StyledRight
} from './style'

export default memo(function AppPlayerPanel(props) {

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
    currentSongIndex: r_currentSongIndex
  } = useSelector(state => ({
    songList: state.getIn(['player', 'songList']),
    currentSong: state.getIn(['player', 'currentSong']),
    currentSongIndex: state.getIn(['player', 'currentSongIndex'])
  }), shallowEqual)

  /**
   * other hooks
   */
  const scrollPanelRef = useRef()

  useEffect(() => {
    scrollPanelRef.current && scrollPanelRef.current.scrollUpdate && scrollPanelRef.current.scrollUpdate()
  }, [r_songList])

  return (
    <StyledWrapper style={{ display: isShowPanel ? 'block' : 'none' }}>
      <PanelHeader songList={r_songList} currentSong={r_currentSong} handleCloseClick={handleCloseClick} />
      <StyledContent>
        <StyledLeft>
          <ScrollPanel delta={55} ref={scrollPanelRef}>
            <PanelPlaylist songList={r_songList} currentSongIndex={r_currentSongIndex} />
          </ScrollPanel>
        </StyledLeft>
        <StyledRight>

        </StyledRight>
      </StyledContent>
    </StyledWrapper>
  )
})
