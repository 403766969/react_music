import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import { formatUrlWithSize } from '@/utils/formatter'

import {
  action_set_currentCategory
} from '../../store/actionCreators'

import {
  StyledWrapper
} from './style'

export default memo(function TopCategory(props) {

  /**
   * props and state
   */
  const { title = '', categories = [], currentCategory = {} } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const hanldeItemClick = item => {
    if (item === currentCategory) {
      return
    }
    dispatch(action_set_currentCategory(item))
  }

  return (
    <StyledWrapper className="top-category">
      <h2 className="category-title">{title}</h2>
      <ul className="category-list">
        {
          categories.map(item => {
            return (
              <li
                className={`category-item ${item === currentCategory ? 'active' : ''}`}
                key={item.id}
                onClick={() => hanldeItemClick(item)}>
                <img src={formatUrlWithSize(item.coverImgUrl, 40)} alt={item.name} />
                <div className="item-info">
                  <p className="item-name text-nowrap">{item.name}</p>
                  <p className="item-update text-nowrap">{item.updateFrequency}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </StyledWrapper>
  )
})
