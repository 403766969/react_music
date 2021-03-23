import { actionTypes } from './constants'

import * as albumApi from '@/services/albumApi'
import * as artistApi from '@/services/artistApi'

/**
 * 操作state
 */
export const merge_state = state => ({
  type: actionTypes.MERGE_STATE,
  state: state
})

export const clear_state = () => ({
  type: actionTypes.CLEAR_STATE
})

export const set_albumDetail = albumDetail => ({
  type: actionTypes.SET_ALBUM_DETAIL,
  albumDetail: albumDetail
})

export const set_songList = songList => ({
  type: actionTypes.SET_SONG_LIST,
  songList: songList
})

export const set_hotCommentList = hotCommentList => ({
  type: actionTypes.SET_HOT_COMMENT_LIST,
  hotCommentList: hotCommentList
})

export const set_newCommentList = newCommentList => ({
  type: actionTypes.SET_NEW_COMMENT_LIST,
  newCommentList: newCommentList
})

export const set_newCommentCount = newCommentCount => ({
  type: actionTypes.SET_NEW_COMMENT_COUNT,
  newCommentCount: newCommentCount
})

export const set_relatedAlbumList = relatedAlbumList => ({
  type: actionTypes.SET_RELATED_ALBUM_LIST,
  relatedAlbumList: relatedAlbumList
})

export const set_albumDetailIsLoading = albumDetailIsLoading => ({
  type: actionTypes.SET_ALBUM_DETAIL_IS_LOADING,
  albumDetailIsLoading: albumDetailIsLoading
})

/**
 * 异步请求
 */
// 专辑详情
export const get_albumDetail = albumId => {
  return async dispatch => {
    dispatch(set_albumDetailIsLoading(true))
    const res = await albumApi.get_album_detail(albumId)
    if (res) {
      if (res.album) {
        dispatch(set_albumDetail(res.album))
        if (res.album.artist) {
          dispatch(get_relatedAlbumList(res.album.artist.id))
        }
      }
      if (res.songs) {
        dispatch(set_songList(res.songs))
      }
    }
    dispatch(set_albumDetailIsLoading(false))
  }
}

// 热门评论
export const get_hotCommentList = (albumId, offset = 0, limit = 15) => {
  return async dispatch => {
    const res = await albumApi.get_comment_hot(albumId, offset, limit)
    if (res && res.hotComments) {
      dispatch(set_hotCommentList(res.hotComments))
    }
  }
}

// 最新评论
export const get_newCommentList = (albumId, offset = 0, limit = 20) => {
  return async dispatch => {
    const res = await albumApi.get_comment_album(albumId, offset, limit)
    if (res) {
      if (res.comments) {
        dispatch(set_newCommentList(res.comments))
      }
      if (res.total) {
        dispatch(set_newCommentCount(res.total))
      }
    }
  }
}

// 相关专辑
export const get_relatedAlbumList = artistId => {
  return async dispatch => {
    const res = await artistApi.get_artist_album(artistId, 0, 5)
    if (res && res.hotAlbums) {
      dispatch(set_relatedAlbumList(res.hotAlbums))
    }
  }
}
