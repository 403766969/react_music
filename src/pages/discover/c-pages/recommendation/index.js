import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'

import { getBannersAction } from './store/actionCreators'

const mapStateToProps = state => ({
  banners: state.recommendation.banners
})

const mapDispatchToProps = dispatch => ({
  getBanners: () => dispatch(getBannersAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  memo(function Recommendation(props) {

    const { getBanners } = props

    useEffect(() => {
      getBanners()
    }, [getBanners])

    return (
      <div>
        <h3>Recommendation</h3>
      </div>
    )

  })
)
