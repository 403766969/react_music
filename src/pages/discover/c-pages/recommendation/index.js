import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getBannersAction } from './store/actionCreators'

export default memo(function Recommendation(props) {

  const { banners } = useSelector(state => ({
    // banners: state.get('recommendation').get('banners')
    banners: state.getIn(['recommendation', 'banners'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBannersAction())
  }, [dispatch])

  return (
    <div>
      <h3>Recommendation</h3>
      <div>{banners.length}</div>
    </div>
  )
})
