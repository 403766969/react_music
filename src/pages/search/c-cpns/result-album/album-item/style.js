import styled from 'styled-components'

export const StyledWrapper = styled.li`
  width: 153px;

  .cover {
    position: relative;
    width: 100%;
    height: 130px;

    img {
      width: 130px;
      height: 100%;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 0 -845px;
    }

    .play {
      display: none;
      position: absolute;
      bottom: 5px;
      right: 28px;
      width: 22px;
      height: 22px;
      background-position: 0 -85px;

      &:hover {
        background-position: 0 -110px;
      }
    }

    &:hover {
      .play {
        display: block;
      }
    }
  }

  .name {
    margin: 8px 0 3px 0;
    width: 100%;
    line-height: 1.4;
    font-size: 14px;

    .link {
      color: #000;
    }
  }

  .artist {
    width: 100%;
    line-height: 1.4;
    font-size: 12px;

    .link {
      color: #666;
    }
  }
`
