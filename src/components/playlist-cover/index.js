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

export default memo(function PlaylistCover(props) {

  /**
   * props and state
   */
  const { playlistInfo = {}, isShowAuthor = false } = props

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
    history.push(`/discover/playlist?id=${playlistInfo.id}`)
  }

  const handleAddList = e => {
    e.stopPropagation()
    dispatch(action_increase_songList_with_playlistId(playlistInfo.id))
  }

  return (
    <StyledWrapper>
      <StyledImage onClick={pushRoute}>
        <img className="image" src={formatUrlWithSize(playlistInfo.picUrl || playlistInfo.coverImgUrl, 140)} alt="" />
        <div className="mask sprite_covor" title={playlistInfo.name}></div>
        <div className="heat sprite_covor">
          <span>
            <i className="sprite_icon count"></i>
            {formatCount(playlistInfo.playCount)}
          </span>
          <span>
            <i className="sprite_icon play" onClick={e => handleAddList(e)}></i>
          </span>
        </div>
      </StyledImage>
      <StyledDec>
        <p className={'cover-name' + (isShowAuthor ? ' text-nowrap' : '')}>
          <NavLink to={`/discover/playlist?id=${playlistInfo.id}`} title={playlistInfo.name}>{playlistInfo.name}</NavLink>
        </p>
        {
          isShowAuthor && (
            <p className="cover-author text-nowrap">
              <span>by</span>
              <NavLink to={`/user/home?id=${playlistInfo.id}`}
                title={playlistInfo.copywriter || playlistInfo.creator.nickname}>
                {playlistInfo.copywriter || playlistInfo.creator.nickname}
              </NavLink>
            </p>
          )
        }
      </StyledDec>
    </StyledWrapper>
  )
})
