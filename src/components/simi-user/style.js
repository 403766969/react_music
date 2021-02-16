import styled from 'styled-components'

export const StyleWrapper = styled.div`
  .content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .user-item {
      margin: 0 0 13px 13px;

      &:nth-of-type(4n+1) {
        margin-left: 0;
      }

      .avatar {
        width: 40px;
        height: 40px;
      }
    }
  }
`
