import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import {
  formatUrlWithSize,
  formatCount
} from '@/utils/formatter'

import { action_increase_songList_with_songsheetId } from '@/pages/player/store/acitonCreators'

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
    e.stopPropagation()
    dispatch(action_increase_songList_with_songsheetId(songsheetData.id))
  }

  return Object.keys(songsheetData).length > 0 && (
    <StyledWrapper className="cpn-songsheet-cover">
      <div className="songsheet-cover-image" onClick={pushRoute}>
        <img className="image" src={formatUrlWithSize(songsheetData.picUrl || songsheetData.coverImgUrl, 140)} alt="" />
        <div className="mask sprite_covor" title={songsheetData.name}></div>
        <div className="heat sprite_covor">
          <span>
            <i className="sprite_icon count"></i>
            {formatCount(songsheetData.playCount)}
          </span>
          <span>
            <i className="sprite_icon play" onClick={e => handleAddList(e)}></i>
          </span>
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
