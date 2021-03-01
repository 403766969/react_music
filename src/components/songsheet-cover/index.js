import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import { formatUrlWithSize, formatCount } from '@/utils/formatter'

import * as playerAction from '@/pages/player/store/actionCreators'

import { StyledWrapper } from './style'

export default memo(function SongsheetCover(props) {

  /**
   * props and state
   */
  const { songsheetInfo, creator } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const history = useHistory()

  /**
   * other logic
   */
  const pushRoute = () => {
    history.push(`/songsheet?id=${songsheetInfo.id}`)
  }

  const handleAddList = e => {
    dispatch(playerAction.add_multipleSong_with_songsheetId(songsheetInfo.id, true))
  }

  return songsheetInfo
    ? (
      <StyledWrapper className="cpn-songsheet-cover">
        <div className="songsheet-cover-image" onClick={pushRoute}>
          <img className="image" src={formatUrlWithSize(songsheetInfo.picUrl || songsheetInfo.coverImgUrl, 140)} alt="" />
          <div className="mask sprite_covor" title={songsheetInfo.name}></div>
          <div className="heat sprite_covor" onClick={e => e.stopPropagation()}>
            <div className="left">
              <i className="sprite_icon count"></i>
              <span>{formatCount(songsheetInfo.playCount)}</span>
            </div>
            <div className="right">
              <i className="sprite_icon play" onClick={() => handleAddList()}></i>
            </div>
          </div>
        </div>
        <div className="songsheet-cover-desc">
          <p className={'cover-name' + (creator ? ' text-nowrap' : '')}>
            <NavLink to={`/songsheet?id=${songsheetInfo.id}`} title={songsheetInfo.name}>{songsheetInfo.name}</NavLink>
          </p>
          {
            creator && (
              <p className="cover-creator text-nowrap">
                <span>by</span>
                <NavLink to={`/user/home?id=${songsheetInfo.id}`}
                  title={songsheetInfo.copywriter || (songsheetInfo.creator && songsheetInfo.creator.nickname)}>
                  {songsheetInfo.copywriter || (songsheetInfo.creator && songsheetInfo.creator.nickname)}
                </NavLink>
              </p>
            )
          }
        </div>
      </StyledWrapper>
    )
    : null
})
