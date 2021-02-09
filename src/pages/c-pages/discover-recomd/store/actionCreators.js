import { actionTypes } from './constants'

import * as recomdApi from '@/services/recomdApi'
import * as toplistApi from '@/services/toplistApi'
import * as songsheetApi from '@/services/songsheetApi'
import * as songApi from '@/services/songApi'
import axios from 'axios'

/**
 * 操作state
 */
export const action_set_topBannerList = topBannerList => ({
  type: actionTypes.SET_TOP_BANNER_LIST,
  topBannerList: topBannerList
})

export const action_set_hotRecomdList = hotRecomdList => ({
  type: actionTypes.SET_HOT_RECOMD_LIST,
  hotRecomdList: hotRecomdList
})

export const action_set_newAlbumList = newAlbumList => ({
  type: actionTypes.SET_NEW_ALBUM_LIST,
  newAlbumList: newAlbumList
})

export const action_set_rankMultiList = rankMultiList => ({
  type: actionTypes.SET_RANK_MULTI_LIST,
  rankMultiList: rankMultiList
})

export const action_set_settleSingerList = settleSingerList => ({
  type: actionTypes.SET_SETTLE_SINGER_LIST,
  settleSingerList: settleSingerList
})

/**
 * 异步请求
 */
export const action_get_topBannerList = () => {
  return async dispatch => {
    const res = await recomdApi.api_get_banner()
    dispatch(action_set_topBannerList(res.banners))
  }
}

export const action_get_hotRecomdList = limit => {
  return async dispatch => {
    const res = await recomdApi.api_get_personalized(limit)
    dispatch(action_set_hotRecomdList(res.result))
  }
}

export const action_get_newAlbumList = (limit, offset) => {
  return async dispatch => {
    const res = await recomdApi.api_get_topAlbum(limit, offset)
    dispatch(action_set_newAlbumList(res.albums))
  }
}

export const action_get_rankMultiList = () => {
  return async dispatch => {
    const resA = await toplistApi.api_get_toplist()

    const reqB = []
    reqB.push(songsheetApi.api_get_playlistDetail(resA.list[0].id))
    reqB.push(songsheetApi.api_get_playlistDetail(resA.list[1].id))
    reqB.push(songsheetApi.api_get_playlistDetail(resA.list[2].id))
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

    dispatch(action_set_rankMultiList(rankMultiList))
  }
}

export const action_get_settleSingerList = (cat, limit) => {
  return async dispatch => {
    const res = await recomdApi.api_get_artistList(cat, limit)
    dispatch(action_set_settleSingerList(res.artists))
  }
}
