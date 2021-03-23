import React, { memo, Fragment } from 'react'

import LoadingSpin from '@/components/loading-spin'

import { StyledWrapper } from './style'

export default memo(function DescInfo(props) {

  /**
   * props and state
   */
  const { descInfo, isLoading } = props

  return isLoading
    ? (
      < LoadingSpin text="加载中..." />
    )
    : (descInfo
      ? (
        <StyledWrapper className="cpn-desc-info">
          <div className="brief">
            <h2>简介</h2>
            <p>{descInfo.briefDesc}</p>
          </div>
          <div className="intro">
            {
              descInfo.introduction && descInfo.introduction.map((itemX, indeX) => {
                return (
                  <Fragment key={indeX}>
                    <h2>{itemX.ti}</h2>
                    {
                      itemX.txt.split('\n').map((itemY, indeY) => {
                        return (
                          <p key={indeY}>{itemY}</p>
                        )
                      })
                    }
                  </Fragment>
                )
              })
            }
          </div>
        </StyledWrapper>
      )
      : null
    )
})

