import { actionTypes } from './constants'

import { parseLyric, mergeLyric } from '@/utils/parser'

import * as songApi from '@/services/songApi'
import * as albumApi from '@/services/albumApi'
import * as songsheetApi from '@/services/songsheetApi'
import axios from 'axios'

import AppMessage from '@/components/app-message'

/**
 * 操作state
 */
export const merge_state = state => {
  if (state.songList) {
    window.localStorage.setItem('songList', JSON.stringify(state.songList))
  }
  if (state.currentIndex) {
    window.localStorage.setItem('currentIndex', state.currentIndex)
  }
  return {
    type: actionTypes.MERGE_STATE,
    state: state
  }
}

export const clear_state = () => ({
  type: actionTypes.CLEAR_STATE
})

export const set_songList = songList => {
  window.localStorage.setItem('songList', JSON.stringify(songList))
  return {
    type: actionTypes.SET_SONG_LIST,
    songList: songList
  }
}

export const set_lyricList = lyricList => ({
  type: actionTypes.SET_LYRIC_LIST,
  lyricList: lyricList
})

export const set_currentIndex = currentIndex => {
  window.localStorage.setItem('currentIndex', currentIndex)
  return {
    type: actionTypes.SET_CURRENT_INDEX,
    currentIndex: currentIndex
  }
}

export const set_currentRow = currentRow => ({
  type: actionTypes.SET_CURRENT_ROW,
  currentRow: currentRow
})

export const set_audioStatus = audioStatus => ({
  type: actionTypes.SET_AUDIO_STATUS,
  audioStatus: audioStatus
})

export const set_messageConfig = messageConfig => ({
  type: actionTypes.SET_MESSAGE_CONFIG,
  messageConfig: messageConfig
})

/**
 * 异步请求
 */
// 更新歌词列表
export const update_lyricList = () => {
  return async (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const lyricList = getState().getIn(['player', 'lyricList'])
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    const currentSong = songList[currentIndex]
    const currentLyric = lyricList[currentIndex]
    if (currentSong && (!currentLyric || currentLyric.id !== currentSong.id)) {
      const res = await songApi.get_lyric(currentSong.id)
      let lyric = []
      if (!res) {
        lyric.push({ time: 0, content: '获取歌词失败' })
      } else if (res.nolyric) {
        lyric.push({ time: 0, content: '纯音乐，无歌词' })
      } else if (res.uncollected) {
        lyric.push({ time: 0, content: '暂时没有歌词' })
      } else {
        let ol = res.lrc && res.lrc.lyric
        let tl = res.tlyric && res.tlyric.lyric
        if (ol && tl) {
          lyric = mergeLyric(parseLyric(ol), parseLyric(tl))
        } else if (ol && !tl) {
          lyric = parseLyric(ol)
        } else if (!ol && tl) {
          lyric = parseLyric(tl)
        } else {
          lyric.push({ time: 0, content: '暂无歌词' })
        }
      }
      const newLyricList = [...lyricList]
      newLyricList[currentIndex] = {
        id: currentSong.id,
        lyric: lyric
      }
      dispatch(set_lyricList(newLyricList))
      dispatch(set_currentRow(-1))
    }
  }
}

// 切换歌曲
export const toggle_song = index => {
  return (dispatch, getState) => {
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    if (currentIndex === index) {
      const songList = getState().getIn(['player', 'songList'])
      const currentSong = songList[currentIndex]
      if (currentSong) {
        const newSongList = [...songList]
        newSongList[currentIndex] = Object.assign({}, currentSong)
        dispatch(set_songList(newSongList))
      }
    } else {
      dispatch(set_currentIndex(index))
    }
    dispatch(update_lyricList())
  }
}

// 添加单条歌曲
export const add_simpleSong_with_songObject = (songObject, isPlay = false) => {
  return async (dispatch, getState) => {
    dispatch(set_messageConfig({ message: '加载中' }))
    const checkResult = await checkSimpleSong(songObject.id)
    if (!checkResult) {
      AppMessage.show('该歌曲暂时无法播放')
      dispatch(set_messageConfig({ message: '加载失败' }))
      return
    }
    const songList = getState().getIn(['player', 'songList'])
    const existIndex = songList.findIndex(item => item.id === songObject.id)
    if (existIndex !== -1) {
      if (isPlay) {
        dispatch(toggle_song(existIndex))
      }
    } else {
      const newSongList = [...songList]
      newSongList.push(songObject)
      dispatch(set_songList(newSongList))
      if (isPlay) {
        dispatch(toggle_song(newSongList.length - 1))
      }
    }
    dispatch(set_messageConfig({ message: '已添加到播放列表' }))
  }
}

// 添加单条歌曲
export const add_simpleSong_with_songId = (songId, isPlay = false) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中' }))
    const res = await songApi.get_song_detail(songId)
    if (res && res.songs && res.songs[0]) {
      dispatch(add_simpleSong_with_songObject(res.songs[0], isPlay))
    } else {
      dispatch(set_messageConfig({ message: '加载失败' }))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_songList = (songList, isPlay = false) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中' }))
    dispatch(clear_List())
    const ids = []
    for (let item of songList) {
      ids.push(item.id)
    }
    const checkResult = await checkMultipleSong(ids)
    const newSongList = []
    for (let i = 0; i < checkResult.length; i++) {
      if (checkResult[i].availability) {
        newSongList.push(songList[i])
      }
    }
    if (newSongList.length > 0) {
      dispatch(set_songList(newSongList))
      if (isPlay) {
        dispatch(toggle_song(0))
      }
      dispatch(set_messageConfig({ message: '已添加到播放列表' }))
    } else {
      dispatch(set_messageConfig({ message: '加载失败' }))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_trackIds = (trackIds, isPlay = false) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中' }))
    dispatch(clear_List())
    const ids = []
    for (let item of trackIds) {
      ids.push(item.id)
    }
    const checkResult = await checkMultipleSong(ids)
    const idsString = checkResult.filter(item => item.availability).map(item => item.id).join(',')
    const res = await songApi.get_song_detail(idsString)
    if (res && res.songs && res.songs.length > 0) {
      dispatch(set_songList(res.songs))
      if (isPlay) {
        dispatch(toggle_song(0))
      }
      dispatch(set_messageConfig({ message: '已添加到播放列表' }))
    } else {
      dispatch(set_messageConfig({ message: '加载失败' }))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_albumId = (albumId, isPlay = true) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中' }))
    const res = await albumApi.get_album_detail(albumId)
    if (res && res.songs) {
      dispatch(add_multipleSong_with_songList(res.songs, isPlay))
    } else {
      dispatch(set_messageConfig({ message: '加载失败' }))
    }
  }
}

// 添加多条歌曲
export const add_multipleSong_with_songsheetId = (songsheetId, isPlay = true) => {
  return async dispatch => {
    dispatch(set_messageConfig({ message: '加载中' }))
    const res = await songsheetApi.get_playlist_detail(songsheetId)
    if (res && res.playlist && res.playlist.trackIds) {
      dispatch(add_multipleSong_with_trackIds(res.playlist.trackIds, isPlay))
    } else {
      dispatch(set_messageConfig({ message: '加载失败' }))
    }
  }
}

// 删除歌曲
export const remove_song = targetIndex => {
  return (dispatch, getState) => {
    const songList = getState().getIn(['player', 'songList'])
    const lyricList = getState().getIn(['player', 'lyricList'])
    const currentIndex = getState().getIn(['player', 'currentIndex'])
    const newSongList = [...songList]
    const newLyricList = [...lyricList]
    let newIndex = currentIndex
    newSongList.splice(targetIndex, 1)
    newLyricList.splice(targetIndex, 1)
    if (targetIndex < currentIndex) {
      newIndex = currentIndex - 1
    } else if (targetIndex === currentIndex && !newSongList[targetIndex]) {
      newIndex = targetIndex - 1
    }
    const newState = {
      songList: newSongList,
      lyricList: newLyricList,
      currentIndex: newIndex
    }
    dispatch(merge_state(newState))
    dispatch(update_lyricList())
  }
}

// 清空播放列表
export const clear_List = () => {
  return dispatch => {
    dispatch(set_songList([]))
    dispatch(set_lyricList([]))
    dispatch(set_currentIndex(-1))
    dispatch(set_currentRow(-1))
  }
}

/**
 * 其他
 */
// 检查单条歌曲可用性
const checkSimpleSong = async id => {
  const res = await songApi.get_check_music(id)
  if (res && res.success) {
    return true
  } else {
    return false
  }
}

// 检查多条歌曲可用性
const checkMultipleSong = async ids => {
  const req = []
  for (let id of ids) {
    req.push(songApi.get_check_music(id))
  }
  const res = await axios.all(req)
  const checkResult = []
  for (let i = 0; i < res.length; i++) {
    if (res[i] && res[i].success) {
      checkResult.push({ id: ids[i], availability: true })
    } else {
      checkResult.push({ id: ids[i], availability: false })
    }
  }
  return checkResult
}

// 初始化播放列表
export const init_store = () => {
  return dispatch => {
    const s_songList = window.localStorage.getItem('songList')
    const s_currentIndex = window.localStorage.getItem('currentIndex')
    const songList = s_songList ? JSON.parse(s_songList) : []
    const currentIndex = s_currentIndex ? parseInt(JSON.parse(s_currentIndex)) : -1
    if (songList.length > 0) {
      dispatch(set_songList(songList))
    }
    if (songList[currentIndex]) {
      dispatch(toggle_song(currentIndex))
    }
  }
}
