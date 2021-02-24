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
  const { cpnData = {}, author } = props

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
    if (cpnData.id) {
      history.push(`/songsheet?id=${cpnData.id}`)
    }
  }

  const handleAddList = e => {
    e.stopPropagation()
    dispatch(playerAction.add_multipleSong_with_songsheetId(cpnData.id, true))
  }

  return Object.keys(cpnData).length > 0 && (
    <StyledWrapper className="cpn-songsheet-cover">
      <div className="songsheet-cover-image" onClick={pushRoute}>
        <img className="image" src={formatUrlWithSize(cpnData.picUrl || cpnData.coverImgUrl, 140)} alt="" />
        <div className="mask sprite_covor" title={cpnData.name}></div>
        <div className="heat sprite_covor">
          <div className="left">
            <i className="sprite_icon count"></i>
            <span>{formatCount(cpnData.playCount)}</span>
          </div>
          <div className="right">
            <i className="sprite_icon play" onClick={e => handleAddList(e)}></i>
          </div>
        </div>
      </div>
      <div className="songsheet-cover-dec">
        <p className={'cover-name' + (author ? ' text-nowrap' : '')}>
          <NavLink to={`/songsheet?id=${cpnData.id}`} title={cpnData.name}>{cpnData.name}</NavLink>
        </p>
        {
          author && (
            <p className="cover-author text-nowrap">
              <span>by</span>
              <NavLink to={`/user/home?id=${cpnData.id}`}
                title={cpnData.copywriter || (cpnData.creator && cpnData.creator.nickname)}>
                {cpnData.copywriter || (cpnData.creator && cpnData.creator.nickname)}
              </NavLink>
            </p>
          )
        }
      </div>
    </StyledWrapper>
  )
})
