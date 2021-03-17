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
    discover_artist_catTitle,
    song_songDetail,
    artist_baseInfo,
    album_albumDetail,
    songsheet_songsheetDetail,
    mv_mvDetail
  } = useSelector(state => ({
    player_audioStatus: state.getIn(['player', 'audioStatus']),
    player_songList: state.getIn(['player', 'songList']),
    player_currentIndex: state.getIn(['player', 'currentIndex']),
    discover_toplist_chartDetail: state.getIn(['discover/toplist', 'chartDetail']),
    discover_artist_catTitle: state.getIn(['discover/artist', 'catTitle']),
    song_songDetail: state.getIn(['song', 'songDetail']),
    artist_baseInfo: state.getIn(['artist', 'baseInfo']),
    album_albumDetail: state.getIn(['album', 'albumDetail']),
    songsheet_songsheetDetail: state.getIn(['songsheet', 'songsheetDetail']),
    mv_mvDetail: state.getIn(['mv', 'mvDetail'])
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
    case '/discover/artist':
      if (discover_artist_catTitle) {
        title = discover_artist_catTitle + ' - '
      }
      title = title + '歌手 - React Music'
      break
    case '/discover/album':
      title = '新碟上架 - React Music'
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
    case '/artist':
      if (artist_baseInfo && artist_baseInfo.name) {
        title = artist_baseInfo.name + ' - '
      }
      title = title + '歌手 - React Music'
      break
    case '/album':
      if (album_albumDetail && album_albumDetail.name) {
        title = album_albumDetail.name + ' - '
      }
      title = title + '专辑 - React Music'
      break
    case '/songsheet':
      if (songsheet_songsheetDetail && songsheet_songsheetDetail.name) {
        title = songsheet_songsheetDetail.name + ' - '
      }
      title = title + '歌单 - React Music'
      break
    case '/mv':
      if (mv_mvDetail && mv_mvDetail.name) {
        title = mv_mvDetail.name + ' - '
      }
      title = title + 'MV - React Music'
      break
    default:
      title = 'React Music'
      break
  }

  document.title = title

  return null
})
