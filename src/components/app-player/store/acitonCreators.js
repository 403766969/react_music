import { actionTypes } from './constants'

import * as songApi from '@/services/songApi'

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

export const action_set_currentIndex = currentIndex => {
  window.localStorage.setItem('currentIndex', currentIndex)
  return {
    type: actionTypes.SET_CURRENT_INDEX,
    currentIndex: currentIndex
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
    const s_currentIndex = window.localStorage.getItem('currentIndex')
    if (s_currentIndex) {
      dispatch(action_set_currentIndex(parseInt(JSON.parse(s_currentIndex))))
    }
    const songList = getState().getIn(['player', 'songList'])
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    const currentSong = songList[currentIndex] || {}
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
    dispatch(action_set_currentIndex(index))
  }
}

export const action_remove_song = index => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    const newSongList = [...songList]
    newSongList.splice(index, 1)
    dispatch(action_set_songList(newSongList))
    if (index === currentIndex) {
      const nextSong = newSongList[index] || null
      const prevSong = newSongList[index - 1] || null
      const targetSong = nextSong || prevSong || {}
      const targetIndex = nextSong
        ? index
        : prevSong
          ? index - 1
          : -1
      dispatch(action_set_currentSong(targetSong))
      dispatch(action_set_currentIndex(targetIndex))
    } else if (index < currentIndex) {
      dispatch(action_set_currentIndex(currentIndex - 1))
    }
  }
}

export const action_clear_state = () => {
  return dispatch => {
    dispatch(action_set_songList([]))
    dispatch(action_set_currentSong({}))
    dispatch(action_set_currentIndex(-1))
  }
}
