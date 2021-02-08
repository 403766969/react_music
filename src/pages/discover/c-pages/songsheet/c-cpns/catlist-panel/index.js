import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  action_set_currentCat,
  action_get_songsheetData
} from '../../store/actionCreators'

import {
  StyledWrapper
} from './style'

export default memo(function CatlistPanel(props) {

  /**
   * props and state
   */
  const { catList = [] } = props

  const [select, setSelect] = useState('全部')
  const [isShow, setIsShow] = useState(false)

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   * other logic
   */
  const handleAllClick = () => {
    if (select === '全部') {
      return
    }
    setSelect('全部')
    setIsShow(false)
    dispatch(action_set_currentCat('全部'))
    dispatch(action_get_songsheetData(0, 35))
  }

  const handleSubClick = sub => {
    if (select === sub.name) {
      return
    }
    setSelect(sub.name)
    setIsShow(false)
    dispatch(action_set_currentCat(sub.name))
    dispatch(action_get_songsheetData(0, 35))
  }

  return (
    <StyledWrapper>
      <div className="panel-top">
        <h3 className="current-select">{select}</h3>
        <div className="top-selector sprite_button" onClick={e => setIsShow(!isShow)}>
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </div>
      </div>
      <div className="panel-content" style={{ display: isShow ? 'block' : 'none' }}>
        <div className="content-header">
          <i className="sprite_icon arrow"></i>
        </div>
        <div className="content-body">
          <h3 className="body-top">
            <span className="sprite_button2" onClick={handleAllClick}>全部风格</span>
          </h3>
          <ul className="body-list">
            {
              catList.map((catItem, catIndex) => {
                return (
                  <li className="list-li" key={catItem.name}>
                    <div className="li-left">
                      <i className={`sprite_icon2 icon-${catIndex}`}></i>
                      <span>{catItem.name}</span>
                    </div>
                    <div className="li-right">
                      {
                        catItem.subs.map(subItem => {
                          return (
                            <div className="right-item" key={subItem.name}>
                              <span className={`name ${subItem.name === select ? 'active' : ''}`} onClick={e => handleSubClick(subItem)}>{subItem.name}</span>
                              <span className="divider">|</span>
                            </div>
                          )
                        })
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="content-footer">
        </div>
      </div>
    </StyledWrapper>
  )
})
