import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { action_get_songLyric } from '../../../../store/actionCreators'

import {
  StyledWrapper
} from './style'

export default memo(function SongLyric(props) {

  /**
   * props and state
   */
  const { songId } = props

  const [isFold, setIsFold] = useState(true)

  /**
   * redux hooks
   */
  const { songLyric: r_songLyric } = useSelector(state => ({
    songLyric: state.getIn(['song', 'songLyric'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_songLyric(songId))
  }, [dispatch, songId])

  /**
   * other logic
   */

  const lyricRows = isFold ? 13 : r_songLyric.length

  return (
    <StyledWrapper isFold={isFold}>
      <div className="content">
        {
          r_songLyric.slice(0, lyricRows).map(item => {
            return (
              <p key={item.time}>{item.content}</p>
            )
          })
        }
      </div>
      {
        r_songLyric.length > 13
        &&
        (
          <div className="control">
            <button onClick={e => setIsFold(!isFold)}>
              {isFold ? '展开' : '收起'}
              <i className="sprite_icon2"></i>
            </button>
          </div>
        )
      }
    </StyledWrapper>
  )
})
