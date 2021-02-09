import styled from 'styled-components'

export const StyleWrapper = styled.div`
  .content {
    .song-item {
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

        .auchor {
          color: #999;

          .nickname {
            margin-left: 5px;
            color: #666;
          }
        }
      }
    }
  }
`
