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
export const init_songList = () => {
  return async dispatch => {
    const s_songList = window.localStorage.getItem('songList')
    const s_currentSongIndex = window.localStorage.getItem('currentSongIndex')
    const songList = s_songList ? JSON.parse(s_songList) : []
    const currentSongIndex = s_currentSongIndex ? parseInt(JSON.parse(s_currentSongIndex)) : -1
    if (songList.length <= 0) {
      return
    }
    dispatch(set_songList(songList))
    const currentSong = songList[currentSongIndex]
    if (currentSong) {
      dispatch(set_currentSong(currentSong))
      dispatch(set_currentSongIndex(currentSongIndex))
      dispatch(get_currentLyric(currentSong.id))
      dispatch(set_currentLyricIndex(-1))
    }
  }
}

// 添加单条歌曲
export const add_simpleSong_with_song = (song, isPlay = false) => {
  return async (dispatch, getState) => {
    if (!song.id) {
      return
    }
    dispatch(set_playerStatus({
      isShowMessage: true,
      message: '加载中'
    }))
    const songList = getState().getIn(['player', 'songList'])
    const currentSong = getState().getIn(['player', 'currentSong'])
    const existSongIndex = songList.findIndex(item => item.id === song.id)
    let targetSong = null
    let targetSongIndex = -1
    if (existSongIndex !== -1) {
      targetSong = songList[existSongIndex]
      targetSongIndex = existSongIndex
    } else {
      const checkRes = await songApi.get_check_music(song.id, new Date().getTime())
      if (checkRes && checkRes.success) {
        const newSongList = [...songList]
        newSongList.push(song)
        targetSong = song
        targetSongIndex = newSongList.length - 1
        dispatch(set_songList(newSongList))
      } else {
        alert(checkRes.message)
      }
    }
    if (targetSong) {
      dispatch(set_playerStatus({
        isShowMessage: true,
        message: '已添加到播放列表'
      }))
    } else {
      dispatch(set_playerStatus({
        isShowMessage: true,
        message: '加载失败'
      }))
    }
    if (targetSong && isPlay) {
      playSong(dispatch, currentSong, targetSong, targetSongIndex)
    }
  }
}

// 添加单条歌曲
export const add_simpleSong_with_songId = (songId, isPlay = false) => {
  return async (dispatch, getState) => {
    dispatch(set_playerStatus({
      isShowMessage: true,
      message: '加载中'
    }))
    const songList = getState().getIn(['player', 'songList'])
    const currentSong = getState().getIn(['player', 'currentSong'])
    const existSongIndex = songList.findIndex(item => item.id === songId)
    let targetSong = null
    let targetSongIndex = -1
    if (existSongIndex !== -1) {
      targetSong = songList[existSongIndex]
      targetSongIndex = existSongIndex
    } else {
      const checkRes = await songApi.get_check_music(songId, new Date().getTime())
      if (checkRes && checkRes.success) {
        const res = await songApi.get_song_detail(songId)
        if (res && res.songs && res.songs[0]) {
          const newSongList = [...songList]
          newSongList.push(res.songs[0])
          targetSong = res.songs[0]
          targetSongIndex = newSongList.length - 1
          dispatch(set_songList(newSongList))
        }
      } else {
        alert(checkRes.message)
      }
    }
    if (targetSong) {
      dispatch(set_playerStatus({
        isShowMessage: true,
        message: '已添加到播放列表'
      }))
    } else {
      dispatch(set_playerStatus({
        isShowMessage: true,
        message: '加载失败'
      }))
    }
    if (targetSong && isPlay) {
      playSong(dispatch, currentSong, targetSong, targetSongIndex)
    }
  }
}

// 切换歌曲
export const toggle_song_with_songIndex = songIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const currentSong = getState().getIn(['player', 'currentSong'])
    const existSong = songList[songIndex]
    if (existSong) {
      playSong(dispatch, currentSong, existSong, songIndex)
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
    dispatch(set_playerStatus({
      isShowMessage: true,
      message: '加载中'
    }))
    dispatch(clear_state())
    const ids = await check_multipleSong_with_trackIds(trackIds)
    const res = await songApi.get_song_detail(ids)
    const newSongList = res.songs
    dispatch(set_songList(newSongList))
    if (isPlay && newSongList.length > 0) {
      dispatch(set_currentSong(newSongList[0]))
      dispatch(set_currentSongIndex(0))
      dispatch(get_currentLyric(newSongList[0].id))
      dispatch(set_currentLyricIndex(-1))
    }
    dispatch(set_playerStatus({
      isShowMessage: true,
      message: '已添加到播放列表'
    }))
  }
}

// 添加多条歌曲
export const add_multipleSong_with_songsheetId = (songsheetId, isPlay = true) => {
  return async dispatch => {
    dispatch(set_playerStatus({
      isShowMessage: true,
      message: '加载中'
    }))
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

/**
 * other logic
 */
// 播放歌曲
const playSong = (dispatch, currentSong, targetSong, targetSongIndex) => {
  if (currentSong.id === targetSong.id) {
    dispatch(set_currentSong(Object.assign({}, currentSong)))
    dispatch(set_currentLyricIndex(-1))
  } else {
    dispatch(set_currentSong(targetSong))
    dispatch(set_currentSongIndex(targetSongIndex))
    dispatch(get_currentLyric(targetSong.id))
    dispatch(set_currentLyricIndex(-1))
  }
}
