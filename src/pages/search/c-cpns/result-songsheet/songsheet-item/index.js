import React, { memo, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { formatUrlWithSize, formatCount } from '@/utils/formatter'
import { matchText } from '@/utils/parser'

import * as playerAction from '@/pages/player/store/actionCreators'

import { StyledWrapper } from './style'

export default memo(function SongsheetItem(props) {

  /**
   * props and state
   */
  const { songsheetInfo, keywordsMatcher } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handlePlayClick = () => {
    dispatch(playerAction.add_multipleSong_with_songsheetId(songsheetInfo.id, true))
  }

  return songsheetInfo
    ? (
      <StyledWrapper className="cpn-songsheet-item">
        <div className="play">
          <i className="sprite_table play-btn" title="播放" onClick={handlePlayClick}></i>
        </div>
        <div className="cover">
          <NavLink className="link" to={`/songsheet?id=${songsheetInfo.id}`} title={songsheetInfo.name}>
            <img src={formatUrlWithSize(songsheetInfo.coverImgUrl, 50, 50, 'y')} alt="" />
            <span className="sprite_covor mask"></span>
          </NavLink>
        </div>
        <div className="name">
          <div className="text text-nowrap">
            <NavLink className="link" to={`/songsheet?id=${songsheetInfo.id}`} title={songsheetInfo.name}>
              {
                matchText(songsheetInfo.name, keywordsMatcher).map((item, index) => {
                  return (
                    <Fragment key={index}>{item}</Fragment>
                  )
                })
              }
            </NavLink>
          </div>
          <div className="operation">
            <i className="sprite_table btn favor" title="收藏"></i>
            <i className="sprite_table btn share" title="分享"></i>
            <i className="sprite_table btn download" title="下载"></i>
          </div>
        </div>
        <div className="song-count text-nowrap">
          <span title={`${formatCount(songsheetInfo.trackCount)}首`}>{formatCount(songsheetInfo.trackCount)}首</span>
        </div>
        <div className="creator text-nowrap">
          {
            songsheetInfo.creator && (
              <span>
                by
                <NavLink className="link" to={`/user/home?id=${songsheetInfo.creator.userId}`} title={songsheetInfo.creator.nickname}>
                  {
                    matchText(songsheetInfo.creator.nickname, keywordsMatcher).map((item, index) => {
                      return (
                        <Fragment key={index}>{item}</Fragment>
                      )
                    })
                  }
                </NavLink>
              </span>
            )
          }
        </div>
        <div className="favor-count text-nowrap">
          <span title={`收藏：${formatCount(songsheetInfo.bookCount)}`}>收藏：{formatCount(songsheetInfo.bookCount)}</span>
        </div>
        <div className="play-count text-nowrap">
          <span title={`收听：${formatCount(songsheetInfo.playCount)}`}>收听：{formatCount(songsheetInfo.playCount)}</span>
        </div>
      </StyledWrapper>
    )
    : null
})
