import { actionTypes } from './constants'

import * as otherApi from '@/services/otherApi'
import * as songsheetApi from '@/services/songsheetApi'
import * as albumApi from '@/services/albumApi'
import * as artistApi from '@/services/artistApi'
import axios from 'axios'

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

export const set_topBannerList = topBannerList => ({
  type: actionTypes.SET_TOP_BANNER_LIST,
  topBannerList: topBannerList
})

export const set_hotRecomdList = hotRecomdList => ({
  type: actionTypes.SET_HOT_RECOMD_LIST,
  hotRecomdList: hotRecomdList
})

export const set_newAlbumList = newAlbumList => ({
  type: actionTypes.SET_NEW_ALBUM_LIST,
  newAlbumList: newAlbumList
})

export const set_rankMultiList = rankMultiList => ({
  type: actionTypes.SET_RANK_MULTI_LIST,
  rankMultiList: rankMultiList
})

export const set_hotArtistList = hotArtistList => ({
  type: actionTypes.SET_HOT_ARTIST_LIST,
  hotArtistList: hotArtistList
})

export const set_rankMultiListIsLoading = rankMultiListIsLoading => ({
  type: actionTypes.SET_RANK_MULTI_LIST_IS_LOADING,
  rankMultiListIsLoading: rankMultiListIsLoading
})

/**
 * 异步请求
 */
// 轮播图
export const get_topBannerList = () => {
  return async dispatch => {
    const res = await otherApi.get_banner()
    if (res && res.banners) {
      dispatch(set_topBannerList(res.banners))
    }
  }
}

// 热门推荐
export const get_hotRecomdList = (limit = 8) => {
  return async dispatch => {
    const res = await otherApi.get_personalized(limit)
    if (res && res.result) {
      dispatch(set_hotRecomdList(res.result))
    }
  }
}

// 新碟上架
export const get_newAlbumList = () => {
  return async dispatch => {
    const res = await albumApi.get_album_newest()
    if (res && res.albums) {
      dispatch(set_newAlbumList(res.albums.slice(0, 10)))
    }
  }
}

// 榜单
export const get_rankMultiList = (rankCount = 3) => {
  return async dispatch => {
    dispatch(set_rankMultiListIsLoading(true))
    const resA = await songsheetApi.get_toplist()
    if (!resA || !resA.list || resA.list.length <= 0) {
      dispatch(set_rankMultiListIsLoading(false))
      return
    }
    const reqB = []
    const reqCount = (rankCount <= resA.list.length) ? rankCount : resA.list.length
    for (let i = 0; i < reqCount; i++) {
      let p = songsheetApi.get_playlist_detail(resA.list[i].id, true).catch(() => undefined)
      reqB.push(p)
    }
    const resB = await axios.all(reqB)
    const rankList = resB.filter(item => {
      if (item && item.playlist) {
        return true
      } else {
        return false
      }
    }).map(item => item.playlist)
    if (rankList.length > 0) {
      dispatch(set_rankMultiList(rankList))
    }
    dispatch(set_rankMultiListIsLoading(false))
  }
}

// 热门歌手
export const get_hotArtistList = (offset = 0, limit = 5) => {
  return async dispatch => {
    const res = await artistApi.get_top_artists(offset, limit)
    if (res && res.artists) {
      dispatch(set_hotArtistList(res.artists))
    }
  }
}
