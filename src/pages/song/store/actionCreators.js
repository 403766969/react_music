import { actionTypes } from './constants'
import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const action_set_songInfo = songInfo => ({
  type: actionTypes.SET_SONG_INFO,
  songInfo: songInfo
})

export const action_set_simiPlaylist = simiPlaylist => ({
  type: actionTypes.SET_SIMI_PLAYLIST,
  simiPlaylist: simiPlaylist
})

export const action_set_simiSong = simiSong => ({
  type: actionTypes.SET_SIMI_SONG,
  simiSong: simiSong
})

/**
 * 异步请求
 */
export const action_get_songInfo = ids => {
  return async dispatch => {
    const res = await songApi.api_get_songDetail(ids)
    dispatch(action_set_songInfo(res.songs[0]))
  }
}

export const action_get_simiPlaylist = id => {
  return async dispatch => {
    const res = await songApi.api_get_simiPlaylist(id)
    dispatch(action_set_simiPlaylist(res.playlists))
  }
}

export const action_get_simiSong = id => {
  return async dispatch => {
    const res = await songApi.api_get_simiSong(id)
    dispatch(action_set_simiSong(res.songs))
  }
}
