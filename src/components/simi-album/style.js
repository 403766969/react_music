import styled from 'styled-components'

export const StyleWrapper = styled.div`
  .content {
    .album-item {
      display: flex;
      align-items: center;
      margin-top: 15px;
      width: 200px;

      .image {
        width: 50px;
        height: 50px;
      }

      .info {
        margin-left: 10px;

        .name {
          font-size: 14px;
          color: #000;
        }

        .time {
          color: #666;
        }
      }
    }
  }
`
