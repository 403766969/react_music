import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { hotRecomdKeywords } from '@/services/local-data'

import { getPersonalizedAction } from '../../store/actionCreators'

import ThemeHeaderRecomd from '@/components/theme-header-recomd'
import SongsCover from '@/components/songs-cover'

import {
  HotRecomdWrapper,
  HotRecomdContent
} from './style'

export default memo(function HotRecomd() {

  const title = '热门推荐'
  const more = {
    title: '更多',
    link: '/discover/playlist'
  }
  const keywords = hotRecomdKeywords

  const storeState = useSelector(state => ({
    personalized: state.getIn(['recomd', 'personalized'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPersonalizedAction(8))
  }, [dispatch])

  return (
    <HotRecomdWrapper>
      <ThemeHeaderRecomd title={title} keywords={keywords} more={more} />
      <HotRecomdContent>
        {
          storeState.personalized.map(item => {
            return (
              <SongsCover songsInfo={item} key={item.id} />
            )
          })
        }
      </HotRecomdContent>
    </HotRecomdWrapper>
  )
})
