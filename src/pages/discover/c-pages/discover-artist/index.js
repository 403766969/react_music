import React, { memo, useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { artistCategories } from '@/services/local-data'

import * as actions from './store/actionCreators'

import InitialSelector from '@/components/initial-selector'

import CatList from './c-cpns/cat-list'
import ArtistList from './c-cpns/artist-list'

import { StyledWrapper } from './style'

export default memo(function DiscoverArtist(props) {

  /**
   * const and let
   */
  const params = new URLSearchParams(props.location.search)
  const area = params.get('area') || '-1'
  const type = params.get('type') || '-1'
  const initial = params.get('initial') || '-1'

  const cat = artistCategories && artistCategories.find(item => item.area === area)
  const sub = cat && cat.subs.find(item => item.type === type)
  const title = (sub && sub.title) || ''

  const [currentInitial, setCurrentInitial] = useState('热门')

  /**
   * redux hooks
   */
  const {
    r_artistList,
    r_artistListIsLoading
  } = useSelector(state => ({
    r_artistList: state.getIn(['discover/artist', 'artistList']),
    r_artistListIsLoading: state.getIn(['discover/artist', 'artistListIsLoading'])
  }), shallowEqual)

  const dispatch = useDispatch()

  /**
   * other hooks
   */
  const history = useHistory()


  useEffect(() => {
    dispatch(actions.set_catTitle(title))
  }, [dispatch, title])

  useEffect(() => {
    dispatch(actions.get_artistList(area, type, initial, 0, 100))
    switch (initial) {
      case '-1':
        setCurrentInitial('热门')
        break
      case '0':
        setCurrentInitial('其他')
        break
      default:
        setCurrentInitial(initial.toUpperCase())
        break
    }
    window.scrollTo(0, 0)
  }, [dispatch, area, type, initial])

  useEffect(() => {
    return () => {
      dispatch(actions.clear_state())
    }
  }, [dispatch])

  /**
   * other logic
   */
  const handleClick = useCallback(value => {
    let initial = ''
    switch (value) {
      case '热门':
        initial = '-1'
        break
      case '其他':
        initial = '0'
        break
      default:
        initial = value.toLowerCase()
    }
    history.push(`/discover/artist?area=${area}&type=${type}&initial=${initial}`)
  }, [history, area, type])

  return (
    <StyledWrapper className="page-discover-artist wrap-v3">
      <div className="left">
        <CatList area={area} type={type} />
      </div>
      <div className="right">
        <h3 className="title">{title}</h3>
        <InitialSelector current={currentInitial} onClick={handleClick} />
        <ArtistList artistList={r_artistList} isLoading={r_artistListIsLoading} />
      </div>
    </StyledWrapper>
  )
})
