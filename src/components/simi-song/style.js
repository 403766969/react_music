import styled from 'styled-components'

export const StyleWrapper = styled.div`
  margin-top: 40px;

  &>.content {
    margin-top: 20px;

    .song-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .info {
        .song {
          width: 156px;
          
          a {
            color: #333;
          }
        }

        &>.artists {
          width: 156px;
          color: #999;
        }
      }

      .operate {
        button {
          opacity: 0.9;
          cursor: pointer;
        }

        .item {
          display: inline-block;
          width: 10px;
          height: 11px;
        }

        .play {
          background-position: -69px -455px;
          margin-right: 10px;
        }

        .add {
          background-position: -87px -454px;
        }
      }
    }
  }
`
