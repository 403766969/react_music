import * as actionTypes from './constants'
import * as playerApi from '@/services/playerApi'

/**
 * 设置state
 */
export const action_set_currentSong = currentSong => ({
  type: actionTypes.SET_CURRENT_SONG,
  currentSong: currentSong
})

/**
 * 异步请求
 */
export const action_get_currentSong = ids => {
  return async dispatch => {
    const res = await playerApi.api_get_songDetail(ids)
    dispatch(action_set_currentSong(res.songs[0]))
  }
}
