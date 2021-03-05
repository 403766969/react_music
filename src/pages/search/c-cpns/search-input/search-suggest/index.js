import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { renderText, keywordsMatcher } from '@/utils/parser'

import { StyledWrapper } from './style'

export default memo(function SearchSuggest(props) {

  /**
   * props and state
   */
  const { inputValue, searchSuggest } = props

  /**
   * render logic
   */
  const rowNames = {
    songs: '单曲',
    artists: '歌手',
    albums: '专辑'
  }

  const suggestList = []
  if (searchSuggest && searchSuggest.order) {
    searchSuggest.order.forEach(item => {
      let rowName = rowNames[item]
      let rowList = searchSuggest[item]
      if (rowName && rowList) {
        suggestList.push({
          type: item,
          name: rowName,
          list: rowList
        })
      }
    })
  }

  const joinArtists = artists => {
    if (artists) {
      return artists.map(item => item.name).join('/')
    } else {
      return ''
    }
  }

  const inputMatcher = keywordsMatcher(inputValue)

  const renderListItem = (item, rowType) => {
    let linkText = ''
    switch (rowType) {
      case 'songs':
        linkText = item.name + ' - ' + joinArtists(item.artists)
        return (
          <li key={item.id}>
            <NavLink className="link text-nowrap" to={`/song?id=${item.id}`}>
              {renderText(linkText, inputMatcher)}
            </NavLink>
          </li>
        )
      case 'artists':
        linkText = item.name
        return (
          <li key={item.id}>
            <NavLink className="link text-nowrap" to={`/artist?id=${item.id}`}>
              {renderText(linkText, inputMatcher)}
            </NavLink>
          </li>
        )
      case 'albums':
        linkText = item.name + ' - ' + item.artist.name
        return (
          <li key={item.id}>
            <NavLink className="link text-nowrap" to={`/album?id=${item.id}`}>
              {renderText(linkText, inputMatcher)}
            </NavLink>
          </li>
        )
      default:
        return null
    }
  }

  return (
    <StyledWrapper className="cpn-search-suggest">
      {
        inputValue && (
          <p className="top text-nowrap">
            <NavLink className="link" to={`/search?keywords=${inputValue}&type=user`}>
              搜 “{inputValue}” 相关用户&gt;
            </NavLink>
          </p>
        )
      }
      <div className="content">
        {
          suggestList.map(rowItem => {
            return (
              <div className="row" key={rowItem.type}>
                <h3>
                  <i className={`sprite_icon2 ${rowItem.type}`}></i>
                  <span>{rowItem.name}</span>
                </h3>
                <ul>
                  {
                    rowItem.list.map(item => {
                      return (
                        renderListItem(item, rowItem.type)
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    </StyledWrapper>
  )
})
