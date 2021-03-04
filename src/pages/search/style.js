import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.content {
    padding: 40px;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;

    .message {
      margin: 28px 0 17px;
      width: 100%;
      height: 14px;
      line-height: 14px;
      color: #999;

      .message-count {
        color: #c20c0c;
      }
    }
  }
`
