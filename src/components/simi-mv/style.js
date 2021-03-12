import styled from 'styled-components'

export const StyleWrapper = styled.div`
  .content {
    .mv-item {
      display: flex;
      align-items: center;
      margin-top: 15px;
      width: 200px;

      .image {
        position: relative;
        width: 96px;
        height: 54px;

        .mask {
          display: flex;
          justify-content: flex-end;
          position: absolute;
          top: 0;
          right: 0;
          width: 90px;
          height: 20px;
          line-height: 20px;
          background: url(${require('@/assets/img/mv_mask.png').default}) 0 0 no-repeat;

          .count {
            position: relative;
            padding: 0 3px 0 17px;
            color: #fff;

            .icon {
              display: block;
              position: absolute;
              top: 50%;
              left: 0;
              width: 15px;
              height: 10px;
              background-position: -60px -310px;
              transform: translateY(-50%);
            }
          }
        }
      }

      .info {
        margin-left: 10px;
        width: 94px;

        .name {
          .link {
            color: #333;
          }
        }

        .artist {
          margin-top: 5px;

          .link {
            color: #999;
          }
        }
      }
    }
  }
`
