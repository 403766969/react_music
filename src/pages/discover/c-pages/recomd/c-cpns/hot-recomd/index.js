import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { hotRecomdLinks } from '@/services/local-data'

import { action_get_hotRecomdList } from '../../store/actionCreators'

import HeaderRecomd from '@/components/header-recomd'
import PlaylistCover from '@/components/playlist-cover'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(function HotRecomd() {

  /**
   * redux hooks
   */
  const { hotRecomdList: r_hotRecomdList } = useSelector(state => ({
    hotRecomdList: state.getIn(['recomd', 'hotRecomdList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_hotRecomdList(8))
  }, [dispatch])

  return (
    <StyledWrapper>
      <HeaderRecomd title="热门推荐" links={hotRecomdLinks} more={{ text: '更多', link: '/discover/playlist' }} />
      <StyledContent>
        {
          r_hotRecomdList.map(item => {
            return (
              <PlaylistCover playlistInfo={item} key={item.id} />
            )
          })
        }
      </StyledContent>
    </StyledWrapper>
  )
})
