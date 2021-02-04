import { actionTypes } from './constants'

import { parseLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'
import * as songsheetApi from '@/services/songsheetApi'
import axios from 'axios'

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
    const currentSong = songList[currentSongIndex]
    if (currentSong) {
      dispatch(action_set_currentSong(currentSong))
      dispatch(action_get_currentLyric(currentSong.id))
    }
    dispatch(action_set_isInited(true))
  }
}

export const action_increase_song = songId => {
  return async (dispatch, getState) => {
    const checkRes = await songApi.api_check_music(songId)
    if (checkRes.success === false) {
      alert(checkRes.message)
      return -1
    }
    const songList = getState().getIn(['player', 'songList'])
    let songIndex = songList.findIndex(item => item.id === songId)
    if (songIndex === -1) {
      const res = await songApi.api_get_songDetail(songId)
      const newSong = res.songs[0]
      const newSongList = [...songList]
      newSongList.push(newSong)
      songIndex = newSongList.length - 1
      dispatch(action_set_songList(newSongList))
    }
    return songIndex
  }
}

export const action_play_song = songId => {
  return async (dispatch, getState) => {
    const songIndex = await action_increase_song(songId)(dispatch, getState)
    const songList = getState().getIn(['player', 'songList'])
    const song = songList[songIndex]
    if (song) {
      const currentSong = getState().getIn(['player', 'currentSong'])
      if (song === currentSong) {
        dispatch(action_set_currentSong(Object.assign({}, song)))
      } else {
        dispatch(action_set_currentSong(song))
      }
      dispatch(action_set_currentSongIndex(songIndex))
      dispatch(action_get_currentLyric(songId))
      dispatch(action_set_currentLyricIndex(-1))
    }
  }
}

export const action_toggle_song = songIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const song = songList[songIndex]
    if (song) {
      const currentSong = getState().getIn(['player', 'currentSong'])
      if (song === currentSong) {
        dispatch(action_set_currentSong(Object.assign({}, song)))
      } else {
        dispatch(action_set_currentSong(song))
      }
      dispatch(action_set_currentSongIndex(songIndex))
      dispatch(action_get_currentLyric(song.id))
      dispatch(action_set_currentLyricIndex(-1))
    }
  }
}

export const action_remove_song = songIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    const newSongList = [...songList]
    newSongList.splice(songIndex, 1)
    dispatch(action_set_songList(newSongList))
    if (songIndex === currentSongIndex) {
      const nextSong = newSongList[songIndex] || null
      const prevSong = newSongList[songIndex - 1] || null
      const targetSong = nextSong || prevSong || {}
      const targetIndex = nextSong
        ? songIndex
        : prevSong
          ? songIndex - 1
          : -1
      dispatch(action_set_currentSong(targetSong))
      dispatch(action_set_currentSongIndex(targetIndex))
    } else if (songIndex < currentSongIndex) {
      dispatch(action_set_currentSongIndex(currentSongIndex - 1))
    }
  }
}

export const action_clear_state = () => {
  return dispatch => {
    dispatch(action_set_songList([]))
    dispatch(action_set_currentSong({}))
    dispatch(action_set_currentSongIndex(-1))
    dispatch(action_set_currentLyric([]))
    dispatch(action_set_currentLyricIndex(-1))
  }
}

export const action_increase_songList_with_trackIds = (trackIds, isPlay = true) => {
  return async dispatch => {
    const ids = await check_music_with_trackIds(trackIds)
    const res = await songApi.api_get_songDetail(ids)
    const newSongList = res.songs
    dispatch(action_set_songList(newSongList))
    if (isPlay && newSongList.length > 0) {
      dispatch(action_set_currentSong(newSongList[0]))
      dispatch(action_set_currentSongIndex(0))
      dispatch(action_get_currentLyric(newSongList[0].id))
      dispatch(action_set_currentLyricIndex(-1))
    }
  }
}

export const action_increase_songList_with_songsheetId = (songsheetId, isPlay = true) => {
  return async dispatch => {
    const res = await songsheetApi.api_get_playlistDetail(songsheetId)
    const trackIds = res.playlist.trackIds
    dispatch(action_increase_songList_with_trackIds(trackIds, isPlay))
  }
}

export const action_get_currentLyric = songId => {
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
    dispatch(action_set_currentLyric(lyric))
  }
}

/**
 * 其他请求
 */
const check_music_with_trackIds = async trackIds => {
  const requests = []
  for (let item of trackIds) {
    requests.push(songApi.api_check_music(item.id))
  }
  const res = await axios.all(requests)
  const ids = []
  res.forEach((item, index) => {
    if (item.success) {
      ids.push(trackIds[index].id)
    }
  })
  return ids.join(',')
}
