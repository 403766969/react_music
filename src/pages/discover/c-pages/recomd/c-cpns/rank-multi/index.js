import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { action_get_rankMulti } from '../../store/actionCreators'

import HeaderRecomd from '@/components/header-recomd'
import RankSimple from '@/components/rank-simple'

import {
  StyledWrapper,
  StyledContent
} from './style'

export default memo(function RankMulti() {

  /**
   * redux hooks
   */
  const {
    rankMultiUp: r_rankMultiUp,
    rankMultiNew: r_rankMultiNew,
    rankMultiOrg: r_rankMultiOrg
  } = useSelector(state => ({
    rankMultiUp: state.getIn(['recomd', 'rankMultiUp']),
    rankMultiNew: state.getIn(['recomd', 'rankMultiNew']),
    rankMultiOrg: state.getIn(['recomd', 'rankMultiOrg'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(action_get_rankMulti(0))
    dispatch(action_get_rankMulti(2))
    dispatch(action_get_rankMulti(3))
  }, [dispatch])

  return (
    <StyledWrapper>
      <HeaderRecomd title="榜单" more={{ text: '更多', link: '/discover/toplist' }} />
      <StyledContent>
        <RankSimple rankSimpleInfo={r_rankMultiUp} />
        <RankSimple rankSimpleInfo={r_rankMultiNew} />
        <RankSimple rankSimpleInfo={r_rankMultiOrg} />
      </StyledContent>
    </StyledWrapper>
  )
})
