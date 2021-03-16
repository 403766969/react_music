import styled from 'styled-components'

export const StyledWrapper = styled.ul`
  .cover-content,
  .text-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &>.item {
      width: 130px;
      padding-left: 17px;
      box-sizing: content-box;

      &:nth-child(5n+1) {
        padding-left: 0;
      }
    }
  }

  .cover-content {
    &>.item {
      padding-bottom: 30px;
    }
  }

  .text-content {
    &>.item {
      height: 30px;
      line-height: 30px;

      .link {
        color: #000;
      }
    }
  }

  &>.divide {
    margin-bottom: 8px;
    width: 100%;
    height: 1px;
    border-bottom: 1px dotted #999;
  }
`
