import React, { memo, useCallback } from 'react'

import Pagination from '@/components/pagination-bar'

import {
  StyledWrapper
} from './style'

export default memo(function Songsheet() {

  /**
   * other logic
   */
  const handlePageChange = useCallback(page => {
    console.log(page)
  }, [])

  return (
    <StyledWrapper>
      <Pagination total={1298} pageSize={35} itemCount={9} onChange={handlePageChange} />
    </StyledWrapper>
  )
})
