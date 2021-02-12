import { actionTypes } from './constants'

import { parseLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const set_songDetail = songDetail => ({
  type: actionTypes.SET_SONG_DETAIL,
  songDetail: songDetail
})

export const set_songLyric = songLyric => ({
  type: actionTypes.SET_SONG_LYRIC,
  songLyric: songLyric
})

export const set_simiSongsheetList = simiSongsheetList => ({
  type: actionTypes.SET_SIMI_SONGSHEET_LIST,
  simiSongsheetList: simiSongsheetList
})

export const set_simiSongList = simiSongList => ({
  type: actionTypes.SET_SIMI_SONG_LIST,
  simiSongList: simiSongList
})

/**
 * 异步请求
 */
export const get_songDetail = songId => {
  return async dispatch => {
    const res = await songApi.get_song_detail(songId)
    dispatch(set_songDetail(res.songs[0]))
  }
}

export const get_songLyric = songId => {
  return async dispatch => {
    const res = await songApi.get_lyric(songId)
    const lyric = []
    if (res.nolyric) {
      lyric.push({ time: 0, content: '纯音乐，无歌词' })
    } else if (res.uncollected) {
      lyric.push({ time: 0, content: '暂时没有歌词' })
    } else if (res.lrc && res.lrc.lyric) {
      lyric.push(...parseLyric(res.lrc.lyric))
    }
    dispatch(set_songLyric(lyric))
  }
}

export const get_simiSongsheetList = songId => {
  return async dispatch => {
    const res = await songApi.get_simi_playlist(songId)
    dispatch(set_simiSongsheetList(res.playlists))
  }
}

export const get_simiSongList = songId => {
  return async dispatch => {
    const res = await songApi.get_simi_song(songId)
    dispatch(set_simiSongList(res.songs))
  }
}
