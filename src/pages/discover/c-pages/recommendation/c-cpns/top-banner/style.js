import styled from 'styled-components'

export const TopBannerWrapper = styled.div`
  background: url(${props => props.bgImage}) center/6000px no-repeat;
`

export const TopBannerContent = styled.div`
  display: flex;
  position: relative;
  height: 285px;
`

export const TopBannerShow = styled.div`
  width: 726px;

  .item {
    overflow: hidden;
    .image {
      height: 285px;
    }
  }
`

export const TopBannerDownload = styled.div`
  position: relative;
  width: 254px;
  height: 285px;
  background: url(${require('@/assets/img/download.png').default}) no-repeat;

  a {
    display: block;
    margin: 186px 0 0 19px;
    width: 215px;
    height: 56px;
    text-indent: -9999px;
    background: url(${require('@/assets/img/download.png').default}) no-repeat;
    background-position: 0 9999px;
    &:hover {
      background-position: 0 -290px;
    }
  }

  .shadow {
    display: block;
    position: absolute;
    width: 20px;
    height: 285px;
    background: url(${require("@/assets/img/banner_sprite.png").default}) no-repeat;
    &:nth-of-type(1) {
      top: 0;
      left: -20px;
      background-position: 0 0;
    }
    &:nth-of-type(2) {
      top: 0;
      right: -20px;
      background-position: -20px 0;
    }
  }
`

export const TopBannerControl = styled.div`
  .btn {
    position: absolute;
    top: 50%;
    width: 37px;
    height: 63px;
    background: url(${require("@/assets/img/banner_sprite.png").default}) no-repeat;
    background-color: transparent;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, .1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`
