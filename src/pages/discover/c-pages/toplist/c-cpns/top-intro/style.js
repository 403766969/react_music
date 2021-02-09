import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;

  .top-cover {
    position: relative;
    padding: 3px;
    border: 1px solid #ccc;

    img {
      width: 150px;
      height: 150px;
    }

    .mask {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 150px;
      height: 150px;
      background-position: -230px -380px;
    }
  }

  .top-info {
    flex: 1;
    margin-left: 30px;
    width: 0;

    &>.top-name {
      margin: 16px 0 4px 0;
      height: 24px;
      line-height: 24px;
      font-size: 20px;
      font-weight: normal;
      color: #333;
    }

    &>.top-update {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
      height: 34px;
      line-height: 34px;

      .clock {
        margin-left: 3px;
        width: 13px;
        height: 13px;
        background-position: -18px -682px;
      }

      .date {
        margin-left: 5px;
        color: #666;
      }

      .frequency {
        margin-left: 3px;
        color: #999;
      }
    }
  }
`
