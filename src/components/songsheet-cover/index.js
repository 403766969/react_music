import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import { formatUrlWithSize, formatCount } from '@/utils/formatter'

import * as playerAction from '@/pages/player/store/acitonCreators'

import { StyledWrapper } from './style'

export default memo(function SongsheetCover(props) {

  /**
   * props and state
   */
  const { songsheetData = {}, isShowAuthor = false } = props

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
    history.push(`/songsheet?id=${songsheetData.id}`)
  }

  const handleAddList = e => {
    dispatch(playerAction.add_multipleSong_with_songsheetId(songsheetData.id, true))
  }

  return Object.keys(songsheetData).length > 0 && (
    <StyledWrapper className="cpn-songsheet-cover">
      <div className="songsheet-cover-image" onClick={pushRoute}>
        <img className="image" src={formatUrlWithSize(songsheetData.picUrl || songsheetData.coverImgUrl, 140)} alt="" />
        <div className="mask sprite_covor" title={songsheetData.name}></div>
        <div className="heat sprite_covor" onClick={e => e.stopPropagation()}>
          <div className="left">
            <i className="sprite_icon count"></i>
            <span>{formatCount(songsheetData.playCount)}</span>
          </div>
          <div className="right">
            <i className="sprite_icon play" onClick={e => handleAddList(e)}></i>
          </div>
        </div>
      </div>
      <div className="songsheet-cover-dec">
        <p className={'cover-name' + (isShowAuthor ? ' text-nowrap' : '')}>
          <NavLink to={`/songsheet?id=${songsheetData.id}`} title={songsheetData.name}>{songsheetData.name}</NavLink>
        </p>
        {
          isShowAuthor && (
            <p className="cover-author text-nowrap">
              <span>by</span>
              <NavLink to={`/user/home?id=${songsheetData.id}`}
                title={songsheetData.copywriter || songsheetData.creator.nickname}>
                {songsheetData.copywriter || songsheetData.creator.nickname}
              </NavLink>
            </p>
          )
        }
      </div>
    </StyledWrapper>
  )
})
