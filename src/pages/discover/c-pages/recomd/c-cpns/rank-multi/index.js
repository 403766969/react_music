import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getTopListAction } from '../../store/actionCreators'

import HeaderRecomd from '@/components/header-recomd'
import RankList from '@/components/rank-list'

import {
  RankMultiWrapper,
  RankMultiContent
} from './style'

export default memo(function RankMulti() {
  const title = '榜单'
  const more = {
    text: '更多',
    link: '/discover/toplist'
  }

  const storeState = useSelector(state => ({
    topListUp: state.getIn(['recomd', 'topListUp']),
    topListNew: state.getIn(['recomd', 'topListNew']),
    topListOrg: state.getIn(['recomd', 'topListOrg'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopListAction(0))
    dispatch(getTopListAction(2))
    dispatch(getTopListAction(3))
  }, [dispatch])

  return (
    <RankMultiWrapper>
      <HeaderRecomd title={title} more={more} />
      <RankMultiContent>
        <RankList info={storeState.topListUp} />
        <RankList info={storeState.topListNew} />
        <RankList info={storeState.topListOrg} />
      </RankMultiContent>
    </RankMultiWrapper>
  )
})
