import { actionTypes } from './constants'

import { playerStatusTypes } from '@/common/constants'

import { parseLyric, mergeLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'
import * as songsheetApi from '@/services/songsheetApi'
import axios from 'axios'

/**
 * 操作state
 */
export const set_songList = songList => {
  window.localStorage.setItem('songList', JSON.stringify(songList))
  return {
    type: actionTypes.SET_SONG_LIST,
    songList: songList
  }
}

export const set_currentIndex = currentIndex => {
  window.localStorage.setItem('currentIndex', currentIndex)
  return {
    type: actionTypes.SET_CURRENT_INDEX,
    currentIndex: currentIndex
  }
}

export const set_currentLyric = currentLyric => ({
  type: actionTypes.SET_CURRENT_LYRIC,
  currentLyric: currentLyric
})

export const set_currentLyricIndex = currentLyricIndex => {
  return {
    type: actionTypes.SET_CURRENT_LYRIC_INDEX,
    currentLyricIndex: currentLyricIndex
  }
}

export const set_playerStatus = playerStatus => {
  return {
    type: actionTypes.SET_PLAYER_STATUS,
    playerStatus: playerStatus
  }
}

/**
 * 异步请求
 */
// 初始化播放列表
export const init_store = () => {
  return async dispatch => {
    const s_songList = window.localStorage.getItem('songList')
    const s_currentIndex = window.localStorage.getItem('currentIndex')
    const songList = s_songList ? JSON.parse(s_songList) : []
    const currentIndex = s_currentIndex ? parseInt(JSON.parse(s_currentIndex)) : -1
    if (songList.length > 0) {
      dispatch(set_songList(songList))
    }
    if (songList[currentIndex]) {
      dispatch(set_currentIndex(currentIndex))
      dispatch(get_currentLyric(songList[currentIndex].id))
    }
  }
}

// 切换歌曲
export const toggle_song = targetIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    if (currentIndex === targetIndex) {
      dispatch(set_playerStatus({
        type: playerStatusTypes.AUDIO_RESTART
      }))
    } else {
      const targetSong = songList[targetIndex]
      dispatch(set_currentIndex(targetIndex))
      dispatch(get_currentLyric(targetSong.id))
    }
  }
}

// 删除歌曲
export const remove_song = targetIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    const newSongList = [...songList]
    newSongList.splice(targetIndex, 1)
    if (targetIndex < currentIndex) {
      dispatch(set_songList(newSongList))
      dispatch(set_currentIndex(currentIndex - 1))
    } else if (targetIndex > currentIndex) {
      dispatch(set_songList(newSongList))
    } else {
      if (newSongList.length <= 0) {
        dispatch(set_songList(newSongList))
        dispatch(set_currentIndex(-1))
      } else if (targetIndex > newSongList.length - 1) {
        dispatch(set_songList(newSongList))
        dispatch(set_currentIndex(targetIndex - 1))
      } else {
        dispatch(set_songList(newSongList))
      }
    }
  }
}

// 添加单条歌曲
export const add_simpleSong_with_songObject = (targetSong, isPlay = false) => {
  return async (dispatch, getState) => {
    dispatch(set_playerStatus({
      type: playerStatusTypes.LOAD_ING
    }))

    const songList = getState().getIn(['player', 'songList'])
    const existIndex = songList.findIndex(item => item.id === targetSong.id)

    if (existIndex !== -1) {
      dispatch(set_playerStatus({
        type: playerStatusTypes.LOAD_SUCCESS
      }))
      if (isPlay) {
        dispatch(toggle_song(existIndex))
      }
      return
    }

    let targetIndex = -1
    const checkRes = await songApi.get_check_music(targetSong.id, new Date().getTime())
    if (!checkRes) {
      alert('检查可用无效')
    } else if (!checkRes.success) {
      alert(checkRes.message)
    } else {
      const newSongList = [...songList]
      newSongList.push(targetSong)
      targetIndex = newSongList.length - 1
      dispatch(set_songList(newSongList))
    }

    if (targetIndex !== -1) {
      dispatch(set_playerStatus({
        type: playerStatusTypes.LOAD_SUCCESS
      }))
      if (isPlay) {
        dispatch(toggle_song(targetIndex))
      }
    } else {
      dispatch(set_playerStatus({
        type: playerStatusTypes.LOAD_FAIL
      }))
    }
  }
}

// 添加单条歌曲
export const add_simpleSong_with_songId = (targetSongId, isPlay = false) => {
  return async dispatch => {
    dispatch(set_playerStatus({
      type: playerStatusTypes.LOAD_ING
    }))
    const res = await songApi.get_song_detail(targetSongId)
    if (res && res.songs && res.songs[0]) {
      dispatch(add_simpleSong_with_songObject(res.songs[0], isPlay))
    } else {
      dispatch(set_playerStatus({
        type: playerStatusTypes.LOAD_FAIL
      }))
    }
  }
}

// 获取歌词
export const get_currentLyric = songId => {
  return async dispatch => {
    const res = await songApi.get_lyric(songId)
    let lyric = []
    if (res.nolyric) {
      lyric.push({ time: 0, content: '纯音乐，无歌词' })
    } else if (res.uncollected) {
      lyric.push({ time: 0, content: '暂时没有歌词' })
    } else if (res.lrc && res.tlyric) {
      const originalLyric = parseLyric(res.lrc.lyric)
      const translationLyric = parseLyric(res.tlyric.lyric)
      lyric = mergeLyric(originalLyric, translationLyric)
    } else if (res.lrc && !res.tlyric) {
      lyric = parseLyric(res.lrc.lyric)
    }
    dispatch(set_currentLyric(lyric))
  }
}

// 清空播放列表
export const clear_state = () => {
  return dispatch => {
    dispatch(set_songList([]))
    dispatch(set_currentIndex(-1))
    dispatch(set_currentLyric([]))
    dispatch(set_currentLyricIndex(-1))
  }
}

// 添加多条歌曲
export const add_multipleSong_with_trackIds = (trackIds, isPlay = false) => {
  return async dispatch => {
    dispatch(clear_state())
    const ids = await check_multipleSong_with_trackIds(trackIds)
    const res = await songApi.get_song_detail(ids)
    const newSongList = res.songs
    dispatch(set_songList(newSongList))
    if (isPlay && newSongList.length > 0) {
      dispatch(set_currentIndex(0))
      dispatch(get_currentLyric(newSongList[0].id))
      dispatch(set_currentLyricIndex(-1))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_songsheetId = (songsheetId, isPlay = true) => {
  return async dispatch => {
    const res = await songsheetApi.get_playlist_detail(songsheetId)
    const trackIds = res.playlist.trackIds
    dispatch(add_multipleSong_with_trackIds(trackIds, isPlay))
  }
}

/**
 * 其他请求
 */
// 检查歌曲可用
const check_multipleSong_with_trackIds = async trackIds => {
  const reqs = []
  const timestamp = new Date().getTime()
  for (let idItem of trackIds) {
    reqs.push(songApi.get_check_music(idItem.id, timestamp))
  }
  const res = await axios.all(reqs)
  const ids = []
  res.forEach((resItem, index) => {
    if (resItem && resItem.success) {
      ids.push(trackIds[index].id)
    }
  })
  return ids.join(',')
}
