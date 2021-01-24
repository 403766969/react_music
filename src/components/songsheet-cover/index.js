import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import {
  formatUrlWithSize,
  formatCount
} from '@/utils/formatter'

import { action_increase_songList_with_playlistId } from '@/components/app-player/store/acitonCreators'

import { NavLink, useHistory } from 'react-router-dom'

import {
  StyledWrapper,
  StyledImage,
  StyledDec
} from './style'

export default memo(function SongsheetCover(props) {

  /**
   * props and state
   */
  const { songsheetInfo = {}, isShowAuthor = false } = props

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
    history.push(`/discover/playlist?id=${songsheetInfo.id}`)
  }

  const handleAddList = e => {
    e.stopPropagation()
    dispatch(action_increase_songList_with_playlistId(songsheetInfo.id))
  }

  return (
    <StyledWrapper>
      <StyledImage onClick={pushRoute}>
        <img className="image" src={formatUrlWithSize(songsheetInfo.picUrl || songsheetInfo.coverImgUrl, 140)} alt="" />
        <div className="mask sprite_covor" title={songsheetInfo.name}></div>
        <div className="heat sprite_covor">
          <span>
            <i className="sprite_icon count"></i>
            {formatCount(songsheetInfo.playCount)}
          </span>
          <span>
            <i className="sprite_icon play" onClick={e => handleAddList(e)}></i>
          </span>
        </div>
      </StyledImage>
      <StyledDec>
        <p className={'cover-name' + (isShowAuthor ? ' text-nowrap' : '')}>
          <NavLink to={`/discover/playlist?id=${songsheetInfo.id}`} title={songsheetInfo.name}>{songsheetInfo.name}</NavLink>
        </p>
        {
          isShowAuthor && (
            <p className="cover-author text-nowrap">
              <span>by</span>
              <NavLink to={`/user/home?id=${songsheetInfo.id}`}
                title={songsheetInfo.copywriter || songsheetInfo.creator.nickname}>
                {songsheetInfo.copywriter || songsheetInfo.creator.nickname}
              </NavLink>
            </p>
          )
        }
      </StyledDec>
    </StyledWrapper>
  )
})
