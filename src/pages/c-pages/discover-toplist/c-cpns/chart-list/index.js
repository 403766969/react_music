import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import { formatUrlWithSize } from '@/utils/formatter'

import * as actions from '../../store/actionCreators'

import { StyledWrapper } from './style'

export default memo(function ChartList(props) {

  /**
   * props and state
   */
  const { title = '', cpnData = [], currentChart = {} } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const hanldeItemClick = item => {
    if (item === currentChart) {
      return
    }
    dispatch(actions.set_currentChart(item))
    dispatch(actions.get_currentChartDetail())
    dispatch(actions.get_hotComment(0, 15))
    dispatch(actions.get_newComment(0, 20))
  }

  return (
    <StyledWrapper className="cpn-chart-list">
      <h2 className="chart-list-title">{title}</h2>
      <ul className="chart-list">
        {
          cpnData.map(item => {
            return (
              <li
                className={`chart-item ${item === currentChart ? 'active' : ''}`}
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
