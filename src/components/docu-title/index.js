import React, { memo, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default memo(function DocuTitle() {

  /**
   * redux hooks
   */
  const { song_songInfo } = useSelector(state => ({
    song_songInfo: state.getIn(['song', 'songInfo'])
  }), shallowEqual)

  /**
   * router hooks
   */
  const location = useLocation()

  /**
   * other hooks
   */
  useEffect(() => {
    switch (location.pathname) {
      case '/song':
        document.title = song_songInfo.name || 'React Music'
        break
      default:
        document.title = 'React Music'
    }
  }, [location, song_songInfo])

  return (
    <>

    </>
  )
})
