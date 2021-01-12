import { actionTypes } from './constants'

import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const action_set_songList = songList => ({
  type: actionTypes.SET_SONG_LIST,
  songList: songList
})

export const action_set_currentSong = currentSong => ({
  type: actionTypes.SET_CURRENT_SONG,
  currentSong: currentSong
})

export const action_set_currentIndex = currentIndex => ({
  type: actionTypes.SET_CURRENT_INDEX,
  currentIndex: currentIndex
})

export const action_set_isInited = isInited => ({
  type: actionTypes.SET_IS_INITED,
  isInited: isInited
})

/**
 * 异步请求
 */
export const action_init_songList = () => {
  return async dispatch => {
    const res1 = await songApi.api_get_songDetail(1443714479)
    const res2 = await songApi.api_get_songDetail(356760)
    dispatch(action_set_songList([res1.songs[0], res2.songs[0]]))
    dispatch(action_set_currentIndex(0))
    dispatch(action_set_currentSong(res1.songs[0]))
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
    const song = songList[index]
    if (currentSong.id === song.id) {
      dispatch(action_set_currentSong({}))
    }
    dispatch(action_set_currentIndex(index))
    dispatch(action_set_currentSong(song))
  }
}
