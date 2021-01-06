import * as actionTypes from './constants'
import * as songApi from '@/services/songApi'

/**
 * 设置state
 */
export const setShowSongAction = showSong => ({
  type: actionTypes.SET_SHOW_SONG,
  showSong: showSong
})

export const setSongSongsAction = songSongs => ({
  type: actionTypes.SET_SONG_SONGS,
  songSongs: songSongs
})

export const setSimiSongAction = simiSong => ({
  type: actionTypes.SET_SIMI_SONG,
  simiSong: simiSong
})

/**
 * 异步请求
 */
export const getShowSongAction = ids => {
  return async dispatch => {
    const res = await songApi.getSongDetailApi(ids)
    dispatch(setShowSongAction(res.songs[0]))
  }
}

export const getSongSongsAction = id => {
  return async dispatch => {
    const res = await songApi.getSimiPlayListApi(id)
    dispatch(setSongSongsAction(res.playlists))
  }
}

export const getSimiSongAction = id => {
  return async dispatch => {
    const res = await songApi.getSimiSongApi(id)
    dispatch(setSimiSongAction(res.songs))
  }
}
