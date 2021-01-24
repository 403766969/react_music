import { actionTypes } from './constants'

import { parseLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const action_set_songInfo = songInfo => ({
  type: actionTypes.SET_SONG_INFO,
  songInfo: songInfo
})

export const action_set_songLyric = songLyric => ({
  type: actionTypes.SET_SONG_LYRIC,
  songLyric: songLyric
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
export const action_get_songInfo = songId => {
  return async dispatch => {
    const res = await songApi.api_get_songDetail(songId)
    dispatch(action_set_songInfo(res.songs[0]))
  }
}

export const action_get_songLyric = songId => {
  return async dispatch => {
    const res = await songApi.api_get_songLyric(songId)
    const lyric = []
    if (res.nolyric) {
      lyric.push({ time: 0, content: '纯音乐，无歌词' })
    } else if (res.uncollected) {
      lyric.push({ time: 0, content: '暂时没有歌词' })
    } else if (res.lrc && res.lrc.lyric) {
      lyric.push(...parseLyric(res.lrc.lyric))
    }
    dispatch(action_set_songLyric(lyric))
  }
}

export const action_get_simiPlaylist = songId => {
  return async dispatch => {
    const res = await songApi.api_get_simiPlaylist(songId)
    dispatch(action_set_simiPlaylist(res.playlists))
  }
}

export const action_get_simiSong = songId => {
  return async dispatch => {
    const res = await songApi.api_get_simiSong(songId)
    dispatch(action_set_simiSong(res.songs))
  }
}
