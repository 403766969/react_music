import { actionTypes } from './constants'

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

export const set_currentSong = currentSong => ({
  type: actionTypes.SET_CURRENT_SONG,
  currentSong: currentSong
})

export const set_currentSongIndex = currentSongIndex => {
  window.localStorage.setItem('currentSongIndex', currentSongIndex)
  return {
    type: actionTypes.SET_CURRENT_SONG_INDEX,
    currentSongIndex: currentSongIndex
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

/**
 * 异步请求
 */
// 初始化播放列表
export const init_songList = () => {
  return async dispatch => {
    const s_songList = window.localStorage.getItem('songList')
    const s_currentSongIndex = window.localStorage.getItem('currentSongIndex')
    const songList = s_songList ? JSON.parse(s_songList) : []
    const currentSongIndex = s_currentSongIndex ? parseInt(JSON.parse(s_currentSongIndex)) : -1
    dispatch(set_songList(songList))
    dispatch(set_currentSongIndex(currentSongIndex))
    const currentSong = songList[currentSongIndex]
    if (currentSong) {
      dispatch(set_currentSong(currentSong))
      dispatch(get_currentLyric(currentSong.id))
    }
  }
}

// 添加单条歌曲
export const add_simpleSong = (songId, isPlay = false) => {
  return async (dispatch, getState) => {
    const checkRes = await songApi.get_check_music(songId)
    if (checkRes.success === false) {
      alert(checkRes.message)
      return
    }
    const songList = getState().getIn(['player', 'songList'])
    const existSongIndex = songList.findIndex(item => item.id === songId)
    if (existSongIndex !== -1 && isPlay) {
      const existSong = songList[existSongIndex]
      const currentSong = getState().getIn(['player', 'currentSong'])
      if (existSong === currentSong) {
        dispatch(set_currentSong(Object.assign({}, existSong)))
        dispatch(set_currentLyricIndex(-1))
      } else {
        dispatch(set_currentSong(existSong))
        dispatch(set_currentSongIndex(existSongIndex))
        dispatch(get_currentLyric(songId))
        dispatch(set_currentLyricIndex(-1))
      }
    } else if (existSongIndex === -1) {
      const res = await songApi.get_song_detail(songId)
      const newSong = res.songs[0]
      const newSongList = [...songList]
      newSongList.push(newSong)
      dispatch(set_songList(newSongList))
      if (isPlay) {
        const newSongIndex = newSongList.length - 1
        dispatch(set_currentSong(newSong))
        dispatch(set_currentSongIndex(newSongIndex))
        dispatch(get_currentLyric(songId))
        dispatch(set_currentLyricIndex(-1))
      }
    }
  }
}

// 切换歌曲
export const toggle_song = songIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const existSong = songList[songIndex]
    if (existSong) {
      const currentSong = getState().getIn(['player', 'currentSong'])
      if (existSong === currentSong) {
        dispatch(set_currentSong(Object.assign({}, existSong)))
        dispatch(set_currentLyricIndex(-1))
      } else {
        dispatch(set_currentSong(existSong))
        dispatch(set_currentSongIndex(songIndex))
        dispatch(get_currentLyric(existSong.id))
        dispatch(set_currentLyricIndex(-1))
      }
    }
  }
}

// 删除歌曲
export const remove_song = songIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    if (songIndex === currentSongIndex) {
      let targetSong = null
      let targetSongIndex = -1
      if (songList[songIndex + 1]) {
        targetSong = songList[songIndex + 1]
        targetSongIndex = songIndex
      } else if (songList[songIndex - 1]) {
        targetSong = songList[songIndex - 1]
        targetSongIndex = songIndex - 1
      }
      if (targetSong) {
        dispatch(set_currentSong(targetSong))
        dispatch(set_currentSongIndex(targetSongIndex))
        dispatch(get_currentLyric(targetSong.id))
        dispatch(set_currentLyricIndex(-1))
      } else {
        dispatch(set_currentSong({}))
        dispatch(set_currentSongIndex(-1))
        dispatch(set_currentLyric([]))
        dispatch(set_currentLyricIndex(-1))
      }
    } else if (songIndex < currentSongIndex) {
      dispatch(set_currentSongIndex(currentSongIndex - 1))
    }
    const newSongList = [...songList]
    newSongList.splice(songIndex, 1)
    dispatch(set_songList(newSongList))
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
    dispatch(set_currentSong({}))
    dispatch(set_currentSongIndex(-1))
    dispatch(set_currentLyric([]))
    dispatch(set_currentLyricIndex(-1))
  }
}

// 添加多条歌曲
export const add_multipleSong_with_trackIds = (trackIds, isPlay = false) => {
  return async dispatch => {
    dispatch(clear_state())
    const ids = await check_music_with_trackIds(trackIds)
    const res = await songApi.get_song_detail(ids)
    const newSongList = res.songs
    dispatch(set_songList(newSongList))
    if (isPlay && newSongList.length > 0) {
      dispatch(set_currentSong(newSongList[0]))
      dispatch(set_currentSongIndex(0))
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
const check_music_with_trackIds = async trackIds => {
  const requests = []
  for (let item of trackIds) {
    requests.push(songApi.get_check_music(item.id))
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
