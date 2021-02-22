import styled from 'styled-components'

export const StyledWrapper = styled.div`
  width: 140px;

  .songsheet-cover-image {
    position: relative;
    margin-bottom: 8px;
    cursor: pointer;

    .image {
      width: 140px;
      height: 140px;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 0 0;
    }

    .heat {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 10px;
      height: 27px;
      color: #ccc;
      background-position: 0 -537px;
      cursor: default;

      .left, .right {
        display: flex;
        justify-content: flex-start;
        align-items: center;       
      }

      .left {
        .count {
          margin-right: 5px;
          width: 14px;
          height: 11px;
          background-position: 0 -24px;
        }
      }

      .right {
        .play {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-position: 0 0;
          cursor: pointer;

          &:hover {
            background-position: 0 -60px;
          }
        }
      }
    }
  }

  .songsheet-cover-dec {
    line-height: 1.4;
    
    .cover-name {
      margin-bottom: 3px;

      a {
        font-size: 14px;
        color: #000;
      }
    }

    .cover-author {
      span {
        margin-right: 3px;
        color: #999;
      }
      
      a {
        color: #666;
      }
    }
  }
`
