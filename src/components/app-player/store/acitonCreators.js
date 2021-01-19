import { actionTypes } from './constants'

import { parseLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'
import * as playlistApi from '@/services/playlistApi'

/**
 * 操作state
 */
export const action_set_songList = songList => {
  window.localStorage.setItem('songList', JSON.stringify(songList))
  return {
    type: actionTypes.SET_SONG_LIST,
    songList: songList
  }
}

export const action_set_currentSong = currentSong => ({
  type: actionTypes.SET_CURRENT_SONG,
  currentSong: currentSong
})

export const action_set_currentSongIndex = currentSongIndex => {
  window.localStorage.setItem('currentSongIndex', currentSongIndex)
  return {
    type: actionTypes.SET_CURRENT_SONG_INDEX,
    currentSongIndex: currentSongIndex
  }
}

export const action_set_currentLyric = currentLyric => ({
  type: actionTypes.SET_CURRENT_LYRIC,
  currentLyric: currentLyric
})

export const action_set_currentLyricIndex = currentLyricIndex => {
  return {
    type: actionTypes.SET_CURRENT_LYRIC_INDEX,
    currentLyricIndex: currentLyricIndex
  }
}

export const action_set_isInited = isInited => ({
  type: actionTypes.SET_IS_INITED,
  isInited: isInited
})

/**
 * 异步请求
 */
export const action_init_songList = () => {
  return async (dispatch, getState) => {
    const s_songList = window.localStorage.getItem('songList')
    if (s_songList) {
      dispatch(action_set_songList(JSON.parse(s_songList)))
    }
    const s_currentSongIndex = window.localStorage.getItem('currentSongIndex')
    if (s_currentSongIndex) {
      dispatch(action_set_currentSongIndex(parseInt(JSON.parse(s_currentSongIndex))))
    }
    const songList = getState().getIn(['player', 'songList'])
    const currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    const currentSong = songList[currentSongIndex] || {}
    dispatch(action_set_currentSong(currentSong))
    dispatch(action_set_isInited(true))
  }
}

export const action_increase_song = songId => {
  return async (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    let index = songList.findIndex(item => item.id === songId)
    if (index === -1) {
      const res = await songApi.api_get_songDetail(songId)
      const newSong = res.songs[0]
      const newSongList = [...songList]
      newSongList.push(newSong)
      index = newSongList.length - 1
      dispatch(action_set_songList(newSongList))
    }
    return index
  }
}

export const action_play_song = songId => {
  return async (dispatch, getState) => {
    const index = await action_increase_song(songId)(dispatch, getState)
    const songList = getState().getIn(['player', 'songList'])
    const currentSong = getState().getIn(['player', 'currentSong'])
    const song = songList[index] || {}
    if (currentSong.id === song.id) {
      dispatch(action_set_currentSong({}))
    }
    dispatch(action_set_currentSong(song))
    dispatch(action_set_currentSongIndex(index))
    dispatch(action_get_currentLyric(songId))
    dispatch(action_set_currentLyricIndex(-1))
  }
}

export const action_remove_song = index => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    const newSongList = [...songList]
    newSongList.splice(index, 1)
    dispatch(action_set_songList(newSongList))
    if (index === currentSongIndex) {
      const nextSong = newSongList[index] || null
      const prevSong = newSongList[index - 1] || null
      const targetSong = nextSong || prevSong || {}
      const targetIndex = nextSong
        ? index
        : prevSong
          ? index - 1
          : -1
      dispatch(action_set_currentSong(targetSong))
      dispatch(action_set_currentSongIndex(targetIndex))
    } else if (index < currentSongIndex) {
      dispatch(action_set_currentSongIndex(currentSongIndex - 1))
    }
  }
}

export const action_clear_state = () => {
  return dispatch => {
    dispatch(action_set_songList([]))
    dispatch(action_set_currentSong({}))
    dispatch(action_set_currentSongIndex(-1))
  }
}

export const action_increase_songList_with_trackIds = trackIds => {
  return async dispatch => {
    const ids = []
    for (let item of trackIds) {
      ids.push(item.id)
    }
    const songIds = ids.join(',')
    const res = await songApi.api_get_songDetail(songIds)
    const newSongList = res.songs
    if (newSongList.length > 0) {
      dispatch(action_set_songList(newSongList))
      dispatch(action_set_currentSong(newSongList[0]))
      dispatch(action_set_currentSongIndex(0))
    }
  }
}

export const action_increase_songList_with_playlistId = playlistId => {
  return async dispatch => {
    const res = await playlistApi.api_get_playlistDetail(playlistId)
    const trackIds = res.playlist.trackIds
    dispatch(action_increase_songList_with_trackIds(trackIds))
  }
}

export const action_get_currentLyric = songId => {
  return async dispatch => {
    const res = await songApi.api_get_songLyric(songId)
    if (res.nolyric) {
      return
    }
    const lyric = parseLyric(res.lrc.lyric)
    dispatch(action_set_currentLyric(lyric))
  }
}
