import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.artist-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    .artist-item {
      margin: 0 0 30px 24px;
      width: 130px;

      &:nth-child(6n+1) {
        margin-left: 0;
      }

      .cover {
        position: relative;

        img {
          width: 130px;
          height: 130px;
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-position: 0 -680px;
        }
      }

      .desc {
        margin-top: 8px;

        .link {
          color: #000;
        }
      }
    }
  }

  &>.footer {
    padding: 15px 0;
  }
`
