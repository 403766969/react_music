import { actionTypes } from './constants'

import * as artistApi from '@/services/artistApi'

/**
 * 操作state
 */
export const merge_state = state => ({
  type: actionTypes.MERGE_STATE,
  state: state
})

export const clear_state = () => ({
  type: actionTypes.CLEAR_STATE
})

export const set_baseInfo = baseInfo => ({
  type: actionTypes.SET_BASE_INFO,
  baseInfo: baseInfo
})

export const set_descInfo = descInfo => ({
  type: actionTypes.SET_DESC_INFO,
  descInfo: descInfo
})

export const set_songList = songList => ({
  type: actionTypes.SET_SONG_LIST,
  songList: songList
})

export const set_songCount = songCount => ({
  type: actionTypes.SET_SONG_COUNT,
  songCount: songCount
})

export const set_albumList = albumList => ({
  type: actionTypes.SET_ALBUM_LIST,
  albumList: albumList
})

export const set_albumCount = albumCount => ({
  type: actionTypes.SET_ALBUM_COUNT,
  albumCount: albumCount
})

export const set_mvList = mvList => ({
  type: actionTypes.SET_MV_LIST,
  mvList: mvList
})

export const set_mvCount = mvCount => ({
  type: actionTypes.SET_MV_COUNT,
  mvCount: mvCount
})

export const set_isLoading = isLoading => ({
  type: actionTypes.SET_IS_LOADING,
  isLoading: isLoading
})

/**
 * 异步请求
 */
// 歌手信息、歌曲列表
export const get_artistDetail = artistId => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await artistApi.get_artists(artistId)
    if (res) {
      if (res.artist) {
        dispatch(set_baseInfo(res.artist))
        dispatch(set_songCount(res.artist.musicSize))
        dispatch(set_albumCount(res.artist.albumSize))
        dispatch(set_mvCount(res.artist.mvSize))
      }
      if (res.hotSongs) {
        dispatch(set_songList(res.hotSongs))
      }
    }
    dispatch(set_isLoading(false))
  }
}

// 专辑列表
export const get_albumList = (artistId, offset = 0, limit = 12) => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await artistApi.get_artist_album(artistId, offset, limit)
    if (res && res.hotAlbums) {
      dispatch(set_albumList(res.hotAlbums))
    }
    dispatch(set_isLoading(false))
  }
}

// MV列表
export const get_mvList = (artistId, offset = 0, limit = 12) => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await artistApi.get_artist_mv(artistId, offset, limit)
    if (res && res.mvs) {
      dispatch(set_mvList(res.mvs))
    }
    dispatch(set_isLoading(false))
  }
}

// 歌手简介
export const get_descInfo = artistId => {
  return async dispatch => {
    dispatch(set_isLoading(true))
    const res = await artistApi.get_artist_desc(artistId)
    if (res) {
      dispatch(set_descInfo(res))
    }
    dispatch(set_isLoading(false))
  }
}
