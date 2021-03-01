import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .artist-info {
    display: flex;

    .artist-name {
      max-width: 75%;
      height: 26px;
      line-height: 26px;
      font-size: 24px;
      font-weight: normal;
      color: #333;
    }

    .artist-alias {
      margin-top: 8px;
      padding-left: 10px;
      max-width: 23%;
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      font-weight: normal;
      color: #999;
    }
  }

  .artist-cover {
    position: relative;
    margin-top: 9px;

    img {
      width: 640px;
      height: 300px;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 640px;
      height: 300px;
      background: url(${require('@/assets/img/ban_mask.png').default}) 0 0 no-repeat;
    }

    .favor {
      display: block;
      position: absolute;
      bottom: 18px;
      right: 20px;
      width: 76px;
      height: 32px;
      background-position: 0 -500px;
      cursor: pointer;

      &:hover {
        background-position: 0 -540px;
      }
    }
  }
`
