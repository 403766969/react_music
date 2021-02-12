import { actionTypes } from './constants'

import * as otherApi from '@/services/otherApi'
import * as songsheetApi from '@/services/songsheetApi'
import * as songApi from '@/services/songApi'
import axios from 'axios'

/**
 * 操作state
 */
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

export const set_settleSingerList = settleSingerList => ({
  type: actionTypes.SET_SETTLE_SINGER_LIST,
  settleSingerList: settleSingerList
})

/**
 * 异步请求
 */
// 轮播图
export const get_topBannerList = () => {
  return async dispatch => {
    const res = await otherApi.get_banner()
    dispatch(set_topBannerList(res.banners))
  }
}

// 热门推荐
export const get_hotRecomdList = limit => {
  return async dispatch => {
    const res = await otherApi.get_personalized(limit)
    dispatch(set_hotRecomdList(res.result))
  }
}

// 新碟上架
export const get_newAlbumList = (limit, offset) => {
  return async dispatch => {
    const res = await otherApi.get_top_album(limit, offset)
    dispatch(set_newAlbumList(res.albums))
  }
}

// 榜单
export const get_rankMultiList = () => {
  return async dispatch => {
    const resA = await songsheetApi.get_toplist()

    const reqB = []
    reqB.push(songsheetApi.get_playlist_detail(resA.list[0].id))
    reqB.push(songsheetApi.get_playlist_detail(resA.list[1].id))
    reqB.push(songsheetApi.get_playlist_detail(resA.list[2].id))
    const resB = await axios.all(reqB)

    const reqC = []
    reqC.push(songApi.api_get_songDetail(resB[0].playlist.trackIds.slice(0, 10).map(item => item.id).join(',')))
    reqC.push(songApi.api_get_songDetail(resB[1].playlist.trackIds.slice(0, 10).map(item => item.id).join(',')))
    reqC.push(songApi.api_get_songDetail(resB[2].playlist.trackIds.slice(0, 10).map(item => item.id).join(',')))
    const resC = await axios.all(reqC)

    resB[0].playlist.tracks = resC[0].songs
    resB[1].playlist.tracks = resC[1].songs
    resB[2].playlist.tracks = resC[2].songs

    const rankMultiList = []
    rankMultiList.push(resB[0].playlist)
    rankMultiList.push(resB[1].playlist)
    rankMultiList.push(resB[2].playlist)

    dispatch(set_rankMultiList(rankMultiList))
  }
}

// 入驻歌手
export const get_settleSingerList = (cat, limit) => {
  return async dispatch => {
    const res = await otherApi.get_artistList(cat, limit)
    dispatch(set_settleSingerList(res.artists))
  }
}
