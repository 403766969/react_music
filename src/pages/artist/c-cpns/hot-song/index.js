import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import * as playerActions from '@/pages/player/store/actionCreators'

import SongList from '@/components/song-area/c-cpns/song-list'

import { StyledWrapper } from './style'

export default memo(function HotSong(props) {

  /**
   * props and state
   */
  const { songList, sourceLink } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = () => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, sourceLink, true))
    }
  }

  const handleAddClick = () => {
    if (songList && songList.length > 0) {
      dispatch(playerActions.add_multipleSong_with_songList(songList, sourceLink, false))
    }
  }

  return (
    <StyledWrapper className="cpn-hot-song">
      <div className="operation">
        <button className="sprite_button btn play" title="播放" onClick={handlePlayClick}>
          <i className="sprite_button icon"></i>
          <span>播放</span>
        </button>
        <button className="sprite_button btn add" title="添加到播放列表" onClick={handleAddClick}>
        </button>
        <button className="sprite_button favor btn" title="收藏">
          <i className="sprite_button border"></i>
          <span>收藏热门{songList && songList.length > 0 && songList.length}</span>
        </button>
      </div>
      <SongList
        songList={songList}
        isShowHeader={false}
        order
        name
        duration
        album={{ width: '140px' }} />
    </StyledWrapper>
  )
})
