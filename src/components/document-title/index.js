import { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { audioStatusTypes } from '@/common/constants'

export default memo(function DocumentTitle() {

  /**
   * redux hooks
   */
  const {
    player_audioStatus,
    player_songList,
    player_currentIndex,
    discover_toplist_chartDetail,
    song_songDetail,
    songsheet_songsheetDetail,
    artist_baseInfo
  } = useSelector(state => ({
    player_audioStatus: state.getIn(['player', 'audioStatus']),
    player_songList: state.getIn(['player', 'songList']),
    player_currentIndex: state.getIn(['player', 'currentIndex']),
    discover_toplist_chartDetail: state.getIn(['discover/toplist', 'chartDetail']),
    song_songDetail: state.getIn(['song', 'songDetail']),
    songsheet_songsheetDetail: state.getIn(['songsheet', 'songsheetDetail']),
    artist_baseInfo: state.getIn(['artist', 'baseInfo'])
  }), shallowEqual)

  /**
   * router hooks
   */
  const location = useLocation()

  /**
   * other logic
   */
  if (player_audioStatus && player_audioStatus === audioStatusTypes.AUDIO_PLAY) {
    if (player_songList && player_songList[player_currentIndex]) {
      document.title = '▶ ' + player_songList[player_currentIndex].name
      return null
    }
  }

  let title = ''

  switch (location.pathname) {
    case '/discover/toplist':
      if (discover_toplist_chartDetail && discover_toplist_chartDetail.name) {
        title = discover_toplist_chartDetail.name + ' - '
      }
      title = title + '排行榜 - React Music'
      break
    case '/discover/songsheet':
      title = (new URLSearchParams(location.search).get('sub') || '全部') + ' - 歌单 - React Music'
      break
    case '/song':
      if (song_songDetail && song_songDetail.name) {
        title = song_songDetail.name + ' - '
      }
      if (song_songDetail && song_songDetail.ar) {
        title = title + song_songDetail.ar.map(item => item.name).join('/') + ' - '
      }
      title = title + '单曲 - React Music'
      break
    case '/songsheet':
      if (songsheet_songsheetDetail && songsheet_songsheetDetail.name) {
        title = songsheet_songsheetDetail.name + ' - '
      }
      title = title + '歌单 - React Music'
      break
    case '/artist':
      if (artist_baseInfo && artist_baseInfo.name) {
        title = artist_baseInfo.name + ' - '
      }
      title = title + '歌手 - React Music'
      break
    default:
      title = 'React Music'
      break
  }

  document.title = title

  return null
})
