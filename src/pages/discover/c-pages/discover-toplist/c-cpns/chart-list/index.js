import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'

import { formatUrlWithSize } from '@/utils/formatter'

import { StyledWrapper } from './style'

export default memo(function ChartList(props) {

  /**
   * props and state
   */
  const { title, chartList, currentChartId } = props

  /**
   * other hooks
   */
  const history = useHistory()

  /**
   * other logic
   */
  const hanldeItemClick = item => {
    if (item.id !== currentChartId) {
      history.push(`/discover/toplist?id=${item.id}`)
    }
  }

  return (
    <StyledWrapper className="cpn-chart-list">
      <h2 className="chart-list-title">{title}</h2>
      <ul className="chart-list">
        {
          chartList && chartList.map(item => {
            return (
              <li
                className={`chart-item ${item.id === currentChartId ? 'active' : ''}`}
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
