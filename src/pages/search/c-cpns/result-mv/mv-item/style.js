import styled from 'styled-components'

export const StyledWrapper = styled.li`
  width: 159px;

  .cover {
    position: relative;
    width: 100%;
    height: 90px;

    img {
      width: 100%;
      height: 100%;
    }

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

    .duration {
      position: absolute;
      bottom: 0;
      left: 0;
      padding-left: 5px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      text-shadow: -2px 1px rgb(0 0 0 / 40%);
    }
  }

  .name {
    margin-top: 7px;
    height: 20px;
    line-height: 20px;

    .link {
      font-size: 14px;
      color: #000;
    }
  }

  .artist {
    margin-top: 1px;
    height: 18px;
    line-height: 18px;

    .link {
      color: #666;
    }
  }
`
