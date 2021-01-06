import * as actionTypes from './constants'
import * as playerApi from '@/services/playerApi'

/**
 * 设置state
 */
export const setCurrentSongAction = currentSong => ({
  type: actionTypes.SET_CURRENT_SONG,
  currentSong: currentSong
})

/**
 * 异步请求
 */
export const getCurrentSongAction = ids => {
  return async dispatch => {
    const res = await playerApi.getSongDetailApi(ids)
    dispatch(setCurrentSongAction(res.songs[0]))
  }
}
