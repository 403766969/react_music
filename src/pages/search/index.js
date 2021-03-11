import React, { memo, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import * as actions from './store/actionCreators'

import TabsArea from '@/components/tabs-area'

import SearchInput from './c-cpns/search-input'
import SearchMessage from './c-cpns/search-message'
import ResultSong from './c-cpns/result-song'
import ResultArtist from './c-cpns/result-artist'
import ResultAlbum from './c-cpns/result-album'
import ResultSongsheet from './c-cpns/result-songsheet'

import { StyledWrapper } from './style'

export default memo(function Search(props) {

  /**
   * props and state
   */
  const params = new URLSearchParams(props.location.search)
  const keywords = params.get('keywords')
  const type = params.get('type') || 'song'

  /**
   * reducer
   */
  const {
    r_songList,
    r_songCount,
    r_artistList,
    r_artistCount,
    r_albumList,
    r_albumCount,
    r_songsheetList,
    r_songsheetCount,
    r_searchSuggest
  } = useSelector(state => ({
    r_songList: state.getIn(['search', 'songList']),
    r_songCount: state.getIn(['search', 'songCount']),
    r_artistList: state.getIn(['search', 'artistList']),
    r_artistCount: state.getIn(['search', 'artistCount']),
    r_albumList: state.getIn(['search', 'albumList']),
    r_albumCount: state.getIn(['search', 'albumCount']),
    r_songsheetList: state.getIn(['search', 'songsheetList']),
    r_songsheetCount: state.getIn(['search', 'songsheetCount']),
    r_searchSuggest: state.getIn(['search', 'searchSuggest'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    if (keywords) {
      switch (type) {
        case 'song':
          dispatch(actions.get_songList(keywords, 0, 20))
          break
        case 'artist':
          dispatch(actions.get_artistList(keywords, 0, 24))
          break
        case 'album':
          dispatch(actions.get_albumList(keywords, 0, 20))
          break
        case 'songsheet':
          dispatch(actions.get_songsheetList(keywords, 0, 20))
          break
        default:
          break
      }
    }
  }, [dispatch, keywords, type])

  useEffect(() => {
    dispatch(actions.get_searchSuggest(keywords))
    return () => {
      dispatch(actions.clear_state())
    }
  }, [dispatch, keywords])

  /**
   * other logic
   */
  const handleTabClick = useCallback(key => {
    if (keywords) {
      props.history.push(`/search?keywords=${keywords}&type=${key}`)
    }
  }, [props.history, keywords])

  return (
    <StyledWrapper className="page-search">
      <div className="content wrap-v3">
        <SearchInput keywords={keywords} type={type} searchSuggest={r_searchSuggest} />
        {
          keywords && (
            <SearchMessage
              keywords={keywords}
              type={type}
              songCount={r_songCount}
              artistCount={r_artistCount}
              albumCount={r_albumCount}
              songsheetCount={r_songsheetCount} />
          )
        }
        {
          keywords && (
            <TabsArea activeKey={type} onTabClick={handleTabClick}>
              <div tab="单曲" key="song">
                <ResultSong songList={r_songList} songCount={r_songCount} keywords={keywords} />
              </div>
              <div tab="歌手" key="artist">
                <ResultArtist artistList={r_artistList} artistCount={r_artistCount} keywords={keywords} />
              </div>
              <div tab="专辑" key="album">
                <ResultAlbum albumList={r_albumList} albumCount={r_albumCount} keywords={keywords} />
              </div>
              <div tab="歌单" key="songsheet">
                <ResultSongsheet songsheetList={r_songsheetList} songsheetCount={r_songsheetCount} keywords={keywords} />
              </div>
            </TabsArea>
          )
        }
      </div>
    </StyledWrapper>
  )
})
