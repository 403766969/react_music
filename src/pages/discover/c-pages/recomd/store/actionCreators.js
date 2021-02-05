import { actionTypes } from './constants'

import * as recomdApi from '@/services/recomdApi'
import * as toplistApi from '@/services/toplistApi'
import * as songsheetApi from '@/services/songsheetApi'
import * as songApi from '@/services/songApi'

/**
 * 操作state
 */
export const action_set_carouselImages = carouselImages => ({
  type: actionTypes.SET_CAROUSEL_IMAGES,
  carouselImages: carouselImages
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
export const action_get_carouselImages = () => {
  return async dispatch => {
    const res = await recomdApi.api_get_banner()
    dispatch(action_set_carouselImages(res.banners))
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
    const tlRes = await toplistApi.api_get_toplist()
    const categories = tlRes.list.slice(0, 3)
    const pldRes1 = await songsheetApi.api_get_playlistDetail(categories[0].id)
    const pldRes2 = await songsheetApi.api_get_playlistDetail(categories[1].id)
    const pldRes3 = await songsheetApi.api_get_playlistDetail(categories[2].id)
    const ids1 = pldRes1.playlist.trackIds.slice(0, 10).map(item => item.id).join(',')
    const ids2 = pldRes2.playlist.trackIds.slice(0, 10).map(item => item.id).join(',')
    const ids3 = pldRes3.playlist.trackIds.slice(0, 10).map(item => item.id).join(',')
    const sdRes1 = await songApi.api_get_songDetail(ids1)
    const sdRes2 = await songApi.api_get_songDetail(ids2)
    const sdRes3 = await songApi.api_get_songDetail(ids3)
    pldRes1.playlist.tracks = sdRes1.songs
    pldRes2.playlist.tracks = sdRes2.songs
    pldRes3.playlist.tracks = sdRes3.songs
    const rankMultiList = []
    rankMultiList.push(pldRes1.playlist)
    rankMultiList.push(pldRes2.playlist)
    rankMultiList.push(pldRes3.playlist)
    dispatch(action_set_rankMultiList(rankMultiList))
  }
}

export const action_get_settleSingerList = (cat, limit) => {
  return async dispatch => {
    const res = await recomdApi.api_get_artistList(cat, limit)
    dispatch(action_set_settleSingerList(res.artists))
  }
}
