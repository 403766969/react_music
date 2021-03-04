import React, { memo, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { throttle, debounce } from '@/utils/performance'

import { StyledWrapper } from './style'

export default memo(function SearchInput(props) {

  /**
   * props and state
   */
  const { keywords, type } = props

  const [value, setValue] = useState(keywords || '')
  const [isComposition, setIsComposition] = useState(false)

  /**
   * ref hooks
   */
  const throttleRequest = useRef(throttle(value => {
    // console.log('throttleRequest', value)
  }, 1000)).current

  const debounceRequest = useRef(debounce(value => {
    // console.log('debounceRequest', value)
  }, 1000)).current

  /**
   * other logic
   */
  const history = useHistory()

  const handleSearchClick = () => {
    history.push(`/search?keywords=${value.trim()}&type=${type}`)
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      history.push(`/search?keywords=${value.trim()}&type=${type}`)
    }
  }

  const handleFocus = e => {
    setValue(e.target.value)
    throttleRequest(e.target.value)
    debounceRequest(e.target.value)
  }

  const handleInput = e => {
    setValue(e.target.value)
    if (!isComposition) {
      throttleRequest(e.target.value)
      debounceRequest(e.target.value)
    }
  }

  const handleCompositionStart = e => {
    setIsComposition(true)
  }

  const handleCompositionEnd = e => {
    setIsComposition(false)
    setValue(e.target.value)
    throttleRequest(e.target.value)
    debounceRequest(e.target.value)
  }

  return (
    <StyledWrapper className="cpn-search-input sprite_03">
      <input className="input" type="text"
        value={value}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        onInput={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd} />
      <span className="search" title="搜索" onClick={handleSearchClick}>搜索</span>
    </StyledWrapper>
  )
})
