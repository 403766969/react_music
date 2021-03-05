import React, { memo, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { debounce } from '@/utils/performance'

import * as actions from '../../store/actionCreators'

import SearchSuggest from './search-suggest'

import { StyledWrapper } from './style'

export default memo(function SearchInput(props) {

  /**
   * props and state
   */
  const { keywords, type, searchSuggest } = props

  const [inputValue, setInputValue] = useState(keywords || '')
  const [isComposition, setIsComposition] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * ref hooks
   */
  const debounceRequest = useRef(debounce(value => {
    let searchKeywords = value.trim()
    if (searchKeywords !== '') {
      dispatch(actions.get_searchSuggest(searchKeywords))
    } else {
      dispatch(actions.set_searchSuggest(null))
    }
  }, 1000)).current

  /**
   * other logic
   */
  const history = useHistory()

  const handleSearchClick = e => {
    history.push(`/search?keywords=${inputValue.trim()}&type=${type}`)
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      history.push(`/search?keywords=${inputValue.trim()}&type=${type}`)
    }
  }

  const handleInput = e => {
    setInputValue(e.target.value)
    if (!isComposition) {
      debounceRequest(e.target.value)
    }
  }

  const handleCompositionStart = e => {
    setIsComposition(true)
  }

  const handleCompositionEnd = e => {
    setIsComposition(false)
    debounceRequest(e.target.value)
  }
  return (
    <StyledWrapper className="cpn-search-input sprite_03">
      <input className="input" type="text"
        value={inputValue}
        onKeyUp={handleKeyUp}
        onInput={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)} />
      <span className="search" title="搜索" onClick={handleSearchClick}>搜索</span>
      <div className="suggest" style={{ display: (isFocus && searchSuggest) ? 'block' : 'none' }}>
        <SearchSuggest inputValue={inputValue} searchSuggest={searchSuggest} />
      </div>
    </StyledWrapper>
  )
})
