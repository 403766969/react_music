import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  background: url(${require('@/assets/img/sprite_table.png').default}) 0 0 repeat-x;

  .cell {
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      display: block;
      position: absolute;
      left: -1px;
      top: 0;
      width: 2px;
      height: 100%;
      background: url(${require('@/assets/img/sprite_table.png').default}) 0 -56px no-repeat;
    }

    &:first-child::before {
      display: none;
    }

    .content {
      padding: 0 10px;
      height: 34px;
      line-height: 34px;
    }
  }
`
